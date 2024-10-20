import IUser, { IUserWithoutPass } from '../../interfaces/IUser';
import SequelizeUser from '../../database/models/SequelizeUser';
import { ServiceResponse } from '../../interfaces/ServiceResponse';

export default class GetUser {
  private model = SequelizeUser;

  async byId(id: number): Promise<ServiceResponse<IUserWithoutPass>> {
    const user: IUser | null = await this.model.findOne({ where: { id }, raw: true });
    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
    }

    const { password: _, ...userWithoutPassword } = user;

    return { status: 'SUCCESSFUL', data: userWithoutPassword };
  }

  async all() {
    const users = await this.model.findAll({ raw: true });
    const formattedUsers = users.map((u) => {
      const { password: _, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
    return { status: 'SUCCESSFUL', data: formattedUsers };
  }
}
