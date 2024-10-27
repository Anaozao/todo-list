"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
const mapStatusHTTP_1 = require("../utils/mapStatusHTTP");
class UserController {
    constructor() {
        this.userService = new UserService_1.default();
    }
    async getUser(req, res) {
        const { id } = req.params;
        const { status, data } = await this.userService.getById(Number(id));
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
    async getAll(req, res) {
        const { status, data } = await this.userService.getAll();
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
    async createUser(req, res) {
        const { email, username, password } = req.body;
        const { status, data } = await this.userService.createUser({ email, username, password });
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
    async changePassword(req, res) {
        const { password, token } = req.body;
        const { status, data } = await this.userService.changePassword({ password, token });
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map