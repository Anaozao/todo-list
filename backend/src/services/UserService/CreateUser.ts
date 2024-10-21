import { hash } from 'bcryptjs';
import { ICreateUser, IUserWithoutPass } from '../../interfaces/IUser';
import SequelizeUser from '../../database/models/SequelizeUser';
import { ServiceResponse } from '../../interfaces/ServiceResponse';
import createUserValidation from './Validations/createUserValidation';
import JwtUtils from '../../utils/jwtUtils';
import * as nodemailer from 'nodemailer'
import { log } from 'console';
import * as dotenv from 'dotenv';

dotenv.config()

const EMAIL_SERVICE = process.env.EMAIL_SERVICE
const ORIGIN_EMAIL = process.env.ORIGIN_EMAIL
const EMAIL_PASS = process.env.EMAIL_PASS

export default class CreateUser {
  private model = SequelizeUser;

  async createUser(userData: ICreateUser): Promise<ServiceResponse<IUserWithoutPass>> {
    const { email, password, username } = userData;
    
    const error = createUserValidation(userData);
    
    if (error) return { status: error.status, data: { message: error.message } };
    
    const userExists = await this.model.findOne({ where: { email: userData.email } });
    if (userExists) return { status: 'INVALID_VALUE', data: { message: 'Email já cadastrado' } };
    
    const hashedPassword = await hash(password, 10)
    const newUser = {
      email,
      username,
      password: hashedPassword,
      isActive: false
    };

    const { dataValues } = await this.model.create(newUser);

    const createdUser = {
      id: dataValues.id,
      email: userData.email,
      username: userData.username,
      isActive: dataValues.isActive
    };

    const token = new JwtUtils().createToken(createdUser, '')
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      service: EMAIL_SERVICE,
      auth: {
        user: ORIGIN_EMAIL,
        pass: EMAIL_PASS
      }
    })

    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

    const mailOptions = {
      from: ORIGIN_EMAIL,
      to: email,
      subject: 'Confirmação de cadastro',
      text: `
        Clique no link a seguir para confirmar seu cadastro, 
        se não foi você que fez a solicitação, ignore este e-mail: ${verificationLink}
      `
    }

    try {
      const mailInfo = await transporter.sendMail(mailOptions);
      log(mailInfo);

      if (mailInfo.rejected.length > 0) {
        return { status: 'FAIL', data: { message: 'Falha ao cadastrar o email' } };
      }

      return { status: 'CREATED', data: createdUser };
    } catch (error) {
      log('Erro ao enviar email:', error);
      return { status: 'FAIL', data: { message: 'Erro ao enviar email' } };
    }
  }
}
