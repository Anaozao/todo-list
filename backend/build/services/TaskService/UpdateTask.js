"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeTask_1 = require("../../database/models/SequelizeTask");
class UpdateTask {
    constructor() {
        this.model = SequelizeTask_1.default;
    }
    async update({ id, isDone }) {
        const taskExists = this.model.findByPk(id);
        if (!taskExists) {
            return { status: 'NOT_FOUND', data: { message: 'Tarefa não encontrada' } };
        }
        if (typeof isDone !== 'boolean') {
            return { status: 'INVALID_VALUE', data: { message: 'isDone deve ser booleano' } };
        }
        await this.model.update({ isDone: isDone }, { where: { id } });
        return { status: 'SUCCESSFUL', data: { message: 'Atualizado' } };
    }
}
exports.default = UpdateTask;
//# sourceMappingURL=UpdateTask.js.map