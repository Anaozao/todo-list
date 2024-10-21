"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeTask_1 = require("../../database/models/SequelizeTask");
class DeleteTask {
    constructor() {
        this.model = SequelizeTask_1.default;
    }
    async delete(id) {
        const taskExists = await this.model.findByPk(id);
        if (!taskExists) {
            return { status: "NOT_FOUND", data: { message: "Item não encontrado" } };
        }
        await this.model.destroy({ where: { id } });
        return { status: 'SUCCESSFUL', data: { message: "Deletado" } };
    }
}
exports.default = DeleteTask;
//# sourceMappingURL=DeletTask.js.map