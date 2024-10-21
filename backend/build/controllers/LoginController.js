"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginService_1 = require("../services/LoginService");
const mapStatusHTTP_1 = require("../utils/mapStatusHTTP");
class LoginController {
    constructor() {
        this.loginService = new LoginService_1.default();
    }
    async login(req, res) {
        const { email, password } = req.body;
        const { status, data } = await this.loginService.login({ email, password });
        return res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map