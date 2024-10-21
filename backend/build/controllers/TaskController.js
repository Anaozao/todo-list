"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskService_1 = require("../services/TaskService");
const mapStatusHTTP_1 = require("../utils/mapStatusHTTP");
class TaskController {
    constructor() {
        this.taskService = new TaskService_1.default();
    }
    async getAll(_req, res) {
        const { status, data } = await this.taskService.getAll();
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
    async getAllByUser(req, res) {
        const { id } = req.params;
        const { status, data } = await this.taskService.getAllByUserId(Number(id));
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
    async getById(req, res) {
        const { id } = req.params;
        const { status, data } = await this.taskService.getById(Number(id));
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
    async createTask(req, res) {
        const { userId, description } = req.body;
        const { status, data } = await this.taskService.createTask({ userId, description });
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
    async updateTask(req, res) {
        const { id } = req.params;
        const { isDone } = req.body;
        const newReq = {
            id: Number(id),
            isDone,
        };
        const { status, data } = await this.taskService.updateTask(newReq);
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
    async deletTask(req, res) {
        const { id } = req.params;
        const { status, data } = await this.taskService.deleteTask(Number(id));
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
}
exports.default = TaskController;
//# sourceMappingURL=TaskController.js.map