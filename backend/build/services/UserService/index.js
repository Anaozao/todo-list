"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUser_1 = require("./CreateUser");
const GetUser_1 = require("./GetUser");
class UserService {
    constructor() {
        this.create = new CreateUser_1.default();
        this.get = new GetUser_1.default();
    }
    async getById(id) {
        const { status, data } = await this.get.byId(id);
        return { status, data };
    }
    async getAll() {
        const { status, data } = await this.get.all();
        return { status, data };
    }
    async createUser(userData) {
        const { status, data } = await this.create.createUser(userData);
        return { status, data };
    }
}
exports.default = UserService;
//# sourceMappingURL=index.js.map