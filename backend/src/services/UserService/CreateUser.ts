import { hashSync } from 'bcryptjs';
import { ICreateUser, IUserWithoutPass } from '../../interfaces/IUser';
import SequelizeUser from '../../database/models/SequelizeUser';
import { ServiceResponse } from '../../interfaces/ServiceResponse';
import createUserValidation from './Validations/createUserValidation';

export default class CreateUser {
  private model = SequelizeUser;

  async createUser(userData: ICreateUser): Promise<ServiceResponse<IUserWithoutPass>> {
    const { email, password, username } = userData;

    const error = createUserValidation(userData);

    if (error) return { status: error.status, data: { message: error.message } };

    const userExists = await this.model.findOne({ where: { email: userData.email } });
    if (userExists) return { status: 'INVALID_VALUE', data: { message: 'Email já cadastrado' } };

    const newUser = {
      email,
      username,
      password: hashSync(password),
      isActive: false
    };

    const { dataValues } = await this.model.create(newUser);

    const createdUser = {
      id: dataValues.id,
      email: userData.email,
      username: userData.username,
    };

    return { status: 'CREATED', data: createdUser };
  }
}
