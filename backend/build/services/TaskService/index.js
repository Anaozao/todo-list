"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateTask_1 = require("./CreateTask");
const DeletTask_1 = require("./DeletTask");
const GetTask_1 = require("./GetTask");
const UpdateTask_1 = require("./UpdateTask");
class TaskService {
    constructor() {
        this.get = new GetTask_1.default();
        this.create = new CreateTask_1.default();
        this.update = new UpdateTask_1.default();
        this.delete = new DeletTask_1.default();
    }
    async getAll() {
        const { status, data } = await this.get.all();
        return { status, data };
    }
    async getById(id) {
        const { status, data } = await this.get.byId(id);
        return { status, data };
    }
    async getAllByUserId(userId) {
        const { status, data } = await this.get.allByUserId(userId);
        return { status, data };
    }
    async createTask(taskData) {
        const { status, data } = await this.create.create(taskData);
        return { status, data };
    }
    async updateTask({ id, isDone }) {
        const { status, data } = await this.update.update({ id, isDone });
        return { status, data };
    }
    async deleteTask(id) {
        const { status, data } = await this.delete.delete(id);
        return { status, data };
    }
}
exports.default = TaskService;
//# sourceMappingURL=index.js.map