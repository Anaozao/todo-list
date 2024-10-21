import SequelizeUser from "../../database/models/SequelizeUser";
import JWTUtils from '../../utils/jwtUtils'

export default class VerifyEmailService {
  private model = SequelizeUser

  async verify(token: string) {
    try {
      const decoded = new JWTUtils().validateToken(token)
      const userId = decoded.id
      
      console.log(userId)

      const user = await this.model.findByPk(userId)
      
      if (!user) {
        return {status: 'NOT_FOUND', data: {message: 'Usuário não encontrado'}}
      }

      const verifyUser = await this.model.update(
        { isActive: true },
        { where: { id: userId }}
      )

      console.log(verifyUser)

      return {status: 'SUCCESSFUL', data: {message: 'Conta verificada com sucesso!'}}
    } catch (e) {
      return {status: "INVALID_VALUE", data: {message: 'Token inválido ou expirado'}}
    }
  }
}