import { ICreateUser } from '../../interfaces/IUser';
import CreateUser from './CreateUser';
import GetUser from './GetUser';

export default class UserService {
  private create = new CreateUser();
  private get = new GetUser();

  async getById(id: number) {
    const { status, data } = await this.get.byId(id);

    return { status, data };
  }

  async getAll() {
    const { status, data } = await this.get.all();

    return { status, data };
  }

  async createUser(userData: ICreateUser) {
    const { status, data } = await this.create.createUser(userData);

    return { status, data };
  }
}
