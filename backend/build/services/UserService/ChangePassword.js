"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const SequelizeUser_1 = require("../../database/models/SequelizeUser");
const jwtUtils_1 = require("../../utils/jwtUtils");
class ChangePassword {
    constructor() {
        this.model = SequelizeUser_1.default;
    }
    async change({ password, token }) {
        const decoded = new jwtUtils_1.default().validateToken(token);
        const { email } = decoded;
        const user = await this.model.findOne({ where: { email } });
        if (!user) {
            return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
        }
        const hashPass = await (0, bcryptjs_1.hash)(password, 10);
        await this.model
            .update({ password: hashPass }, { where: { email } });
        return { status: 'SUCCESSFUL', data: { message: 'Senha alterada com sucesso' } };
    }
}
exports.default = ChangePassword;
//# sourceMappingURL=ChangePassword.js.map