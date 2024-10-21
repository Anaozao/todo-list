"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeUser_1 = require("../../database/models/SequelizeUser");
const SequelizeTask_1 = require("../../database/models/SequelizeTask");
const sequelizeConfig = {
    raw: true,
    include: [
        { model: SequelizeUser_1.default, as: 'user', attributes: ['username'] },
    ],
};
class GetTask {
    constructor() {
        this.taskModel = SequelizeTask_1.default;
        this.userModel = SequelizeUser_1.default;
    }
    async all() {
        const tasks = await this.taskModel.findAll(sequelizeConfig);
        return { status: 'SUCCESSFUL', data: tasks };
    }
    async byId(id) {
        if (!id)
            return { status: 'BAD_REQUEST', data: { message: 'o campo "id" é obrigatório' } };
        const task = await this.taskModel.findByPk(id, sequelizeConfig);
        if (!task)
            return { status: 'NOT_FOUND', data: { message: 'Tarefa não encontrada' } };
        return { status: 'SUCCESSFUL', data: task };
    }
    async allByUserId(userId) {
        if (!userId) {
            return {
                status: 'BAD_REQUEST',
                data: { message: 'o campo "userId" é obrigatório' }
            };
        }
        const userExists = await this.userModel.findByPk(userId);
        if (!userExists)
            return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
        const tasks = await this.taskModel.findAll({ where: { userId }, ...sequelizeConfig });
        return { status: 'SUCCESSFUL', data: tasks };
    }
}
exports.default = GetTask;
//# sourceMappingURL=GetTask.js.map