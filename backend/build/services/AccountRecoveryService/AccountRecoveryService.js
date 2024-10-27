"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../../utils/jwtUtils");
const SequelizeUser_1 = require("../../database/models/SequelizeUser");
const Nodemailer_1 = require("../../utils/Nodemailer");
const { FRONT_BASE_URL } = process.env;
const { ORIGIN_EMAIL } = process.env;
const mailOptions = (email, verificationLink) => {
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
class AccountRecoveryService {
    constructor() {
        this.model = SequelizeUser_1.default;
    }
    async resetPass(email) {
        const emailExists = await this.model.findOne({ where: { email }, raw: true });
        if (!emailExists) {
            return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
        }
        const token = new jwtUtils_1.default().createToken({ email }, '1d');
        const verificationLink = `${FRONT_BASE_URL}/redefinir-senha?token=${token}`;
        try {
            const mailInfo = await Nodemailer_1.default.sendMail(mailOptions(email, verificationLink));
            if (mailInfo.rejected.length > 0) {
                return { status: 'FAIL', data: { message: 'Falha ao enviar o email' } };
            }
            return {
                status: 'SUCCESSFUL',
                data: { message: 'Link de recuperação de conta enviado ao seu e-mail' },
            };
        }
        catch (e) {
            return { status: 'FAIL', data: { message: 'Erro ao enviar o e-mail' } };
        }
    }
}
exports.default = AccountRecoveryService;
//# sourceMappingURL=AccountRecoveryService.js.map