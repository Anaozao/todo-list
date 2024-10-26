import { hash } from 'bcryptjs';
import SequelizeUser from '../../database/models/SequelizeUser';
import JWTUtils from '../../utils/jwtUtils';

export type ChangePasswordType = {
  password: string,
  token: string
};
export default class ChangePassword {
  private model = SequelizeUser;

  async change({ password, token }: ChangePasswordType) {
    const decoded = new JWTUtils().validateToken(token);
    const { email } = decoded;

    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
    }

    const hashPass = await hash(password, 10);
    await this.model
      .update({ password: hashPass }, { where: { email } });
    return { status: 'SUCCESSFUL', data: { message: 'Senha alterada com sucesso' } };
  }
}
