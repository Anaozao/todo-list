"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeUser_1 = require("../../database/models/SequelizeUser");
class GetUser {
    constructor() {
        this.model = SequelizeUser_1.default;
    }
    async byId(id) {
        const user = await this.model.findOne({ where: { id }, raw: true });
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
exports.default = GetUser;
//# sourceMappingURL=GetUser.js.map