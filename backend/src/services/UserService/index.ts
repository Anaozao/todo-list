import { ICreateUser } from '../../interfaces/IUser';
import ChangePassword, { ChangePasswordType } from './ChangePassword';
import CreateUser from './CreateUser';
import GetUser from './GetUser';

export default class UserService {
  private create = new CreateUser();
  private changePass = new ChangePassword();
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

  async changePassword({ password, token }: ChangePasswordType) {
    const { status, data } = await this.changePass.change({ password, token });

    return { status, data };
  }
}
