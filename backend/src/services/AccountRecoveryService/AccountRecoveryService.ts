import JwtUtils, { Payload } from '../../utils/jwtUtils';
import SequelizeUser from '../../database/models/SequelizeUser';
import transporter from '../../utils/Nodemailer';

const { FRONT_BASE_URL } = process.env;
const { ORIGIN_EMAIL } = process.env;

const mailOptions = (email: string, verificationLink: string) => {
  const options = {
    from: ORIGIN_EMAIL,
    to: email,
    subject: 'Recuperação de conta',
    text: `
    Clique no link a seguir para fazer a alteração de senha, 
    se não foi você que fez a solicitação, ignore este e-mail: ${verificationLink}
  `,
  };
  return options;
};

export default class AccountRecoveryService {
  private model = SequelizeUser;

  async resetPass(email: string): Promise<{ status: string, data: { message: string } }> {
    const emailExists = await this.model.findOne({ where: { email }, raw: true });
    if (!emailExists) {
      return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
    }
    const token = new JwtUtils().createToken({ email } as Payload, '1d');
    const verificationLink = `${FRONT_BASE_URL}/redefinir-senha?token=${token}`;
    try {
      const mailInfo = await transporter.sendMail(mailOptions(email, verificationLink));
      if (mailInfo.rejected.length > 0) {
        return { status: 'FAIL', data: { message: 'Falha ao enviar o email' } };
      }
      return {
        status: 'SUCCESSFUL',
        data: { message: 'Link de recuperação de conta enviado ao seu e-mail' },
      };
    } catch (e) {
      return { status: 'FAIL', data: { message: 'Erro ao enviar o e-mail' } };
    }
  }
}
