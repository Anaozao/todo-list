import { compareSync } from 'bcryptjs';
import SequelizeUser from '../../database/models/SequelizeUser';
import { ILogin } from '../../interfaces/ILogin';
import JwtUtils from '../../utils/jwtUtils';

export default class LoginService {
  private model = SequelizeUser;

  async login(loginData: ILogin) {
    const { email, password } = loginData;
    if (!email || !password) {
      return {
        status: 'BAD_REQUEST',
        data: { message: 'Os campos Email e senha são obrigatórios' } };
    }

    const user = await this.model.findOne({ where: { email }, raw: true });

    if (!user || !compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Usuário ou senha inválidos' } };
    }

    if (!user.isActive) {
      return {
        status: "UNAUTHORIZED",
        data: {message: "Nessessário confirmar o cadastro, verifique o link de confirmação no email"}
      }
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = new JwtUtils().createToken(userWithoutPassword);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
