import { ICreateUser } from '../../interfaces/IUser';
import CreateUser from './CreateUser';
import GetUser from './GetUser';

export default class UserService {
  private create = new CreateUser().createUser;
  private get = new GetUser();

  async getByEmail(email: string) {
    const { status, data } = await this.get.byEmail(email);

    return { status, data };
  }

  async getAll() {
    const { status, data } = await this.get.all();

    return { status, data };
  }

  async createUser(userData: ICreateUser) {
    const modelResponse = await this.create(userData);
    return modelResponse;
  }
}
