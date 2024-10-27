"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTaskValidation = (taskData) => {
    const { description, userId } = taskData;
    if (!description) {
        return { status: 'BAD_REQUEST', message: 'O campo "description" é obrigatório' };
    }
    if (!userId) {
        return { status: 'BAD_REQUEST', message: 'O campo "userId" é obrigatório' };
    }
    if (typeof userId !== 'number') {
        return { status: 'INVALID_VALUE', message: 'O campo "userId" deve ser um número' };
    }
};
exports.default = createTaskValidation;
//# sourceMappingURL=createTaskValidation.js.map