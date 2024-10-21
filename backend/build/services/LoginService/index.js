"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const SequelizeUser_1 = require("../../database/models/SequelizeUser");
const jwtUtils_1 = require("../../utils/jwtUtils");
class LoginService {
    constructor() {
        this.model = SequelizeUser_1.default;
    }
    async login(loginData) {
        const { email, password } = loginData;
        if (!email || !password) {
            return {
                status: 'BAD_REQUEST',
                data: { message: 'Os campos Email e senha são obrigatórios' }
            };
        }
        const user = await this.model.findOne({ where: { email }, raw: true });
        if (!user || !(0, bcryptjs_1.compareSync)(password, user.password)) {
            return { status: 'UNAUTHORIZED', data: { message: 'Usuário ou senha inválidos' } };
        }
        console.log(user);
        if (!user.isActive) {
            return {
                status: "UNAUTHORIZED",
                data: { message: "Nessessário confirmar o cadastro, verifique seu email" }
            };
        }
        const { password: _, ...userWithoutPassword } = user;
        const token = new jwtUtils_1.default().createToken(userWithoutPassword);
        return { status: 'SUCCESSFUL', data: { token } };
    }
}
exports.default = LoginService;
//# sourceMappingURL=index.js.map