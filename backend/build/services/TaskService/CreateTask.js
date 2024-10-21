"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeTask_1 = require("../../database/models/SequelizeTask");
const createTaskValidation_1 = require("./validations/createTaskValidation");
class CreateTask {
    constructor() {
        this.model = SequelizeTask_1.default;
    }
    async create(taskData) {
        const error = (0, createTaskValidation_1.default)(taskData);
        if (error)
            return { status: error.status, data: { message: error.message } };
        const newTaskData = {
            userId: taskData.userId,
            description: taskData.description,
            isDone: false,
            createdAt: new Date(),
        };
        const newTask = await this.model.create(newTaskData, { raw: true });
        return { status: 'CREATED', data: newTask };
    }
}
exports.default = CreateTask;
//# sourceMappingURL=CreateTask.js.map