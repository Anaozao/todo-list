"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeUser_1 = require("../../database/models/SequelizeUser");
const jwtUtils_1 = require("../../utils/jwtUtils");
class VerifyEmailService {
    constructor() {
        this.model = SequelizeUser_1.default;
    }
    async verify(token) {
        try {
            const decoded = new jwtUtils_1.default().validateToken(token);
            const userId = decoded.id;
            console.log(userId);
            const user = await this.model.findByPk(userId);
            if (!user) {
                return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
            }
            const verifyUser = await this.model.update({ isActive: true }, { where: { id: userId } });
            console.log(verifyUser);
            return { status: 'SUCCESSFUL', data: { message: 'Conta verificada com sucesso!' } };
        }
        catch (e) {
            return { status: "INVALID_VALUE", data: { message: 'Token inválido ou expirado' } };
        }
    }
}
exports.default = VerifyEmailService;
//# sourceMappingURL=VerifyEmailService.js.map