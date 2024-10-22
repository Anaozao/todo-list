import { hash } from 'bcryptjs';
import * as dotenv from 'dotenv';
import transporter from '../../utils/Nodemailer';
import { ICreatedUser, ICreateUser, IUserWithoutPass } from '../../interfaces/IUser';
import SequelizeUser from '../../database/models/SequelizeUser';
import { ServiceResponse } from '../../interfaces/ServiceResponse';
import createUserValidation from './Validations/createUserValidation';
import JwtUtils from '../../utils/jwtUtils';

dotenv.config();

const { ORIGIN_EMAIL } = process.env;
const { FRONT_BASE_URL } = process.env;

const createNewUser = async (newUserData: ICreateUser) => {
  const { email, password, username } = newUserData;
  const hashedPass = await hash(password, 10);
  const newUser = {
    email,
    username,
    password: hashedPass,
    isActive: false,
  };
  return newUser;
};

const createdUser = ({ email, id, isActive, username }: ICreatedUser) => {
  const user = {
    id,
    email,
    username,
    isActive,
  };
  return user;
};

const mailOptions = (email: string, verificationLink: string) => {
  const options = {
    from: ORIGIN_EMAIL,
    to: email,
    subject: 'Confirmação de cadastro',
    text: `
    Clique no link a seguir para confirmar seu cadastro, 
    se não foi você que fez a solicitação, ignore este e-mail: ${verificationLink}
  `,
  };
  return options;
};

export default class CreateUser {
  private model = SequelizeUser;

  async createUser(userData: ICreateUser): Promise<ServiceResponse<IUserWithoutPass>> {
    const { email, password, username } = userData;

    const error = createUserValidation(userData);

    if (error) return { status: error.status, data: { message: error.message } };

    const userExists = await this.model.findOne({ where: { email: userData.email } });

    if (userExists) return { status: 'INVALID_VALUE', data: { message: 'Email já cadastrado' } };

    const { dataValues } = await this.model
      .create(await createNewUser({ email, password, username }));

    const newUser = createdUser(dataValues);

    const token = new JwtUtils().createToken(newUser, '');

    const verificationLink = `${FRONT_BASE_URL}/verificar-email?token=${token}`;

    transporter.sendMail(mailOptions(email, verificationLink))
      .then((mailInfo) => {
        if (mailInfo.rejected.length > 0) {
          return { status: 'FAIL', data: { message: 'Falha ao cadastrar o email' } };
        }
      }).catch((_error) => ({ status: 'FAIL', data: { message: 'Erro ao enviar o e-mail' } }));
    return { status: 'CREATED', data: newUser };
  }
}
