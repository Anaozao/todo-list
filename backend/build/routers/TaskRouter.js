"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = require("../controllers/TaskController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => new auth_middleware_1.default(req, res, next).auth(), (req, res) => new TaskController_1.default().getAll(req, res));
router.get('/user/:id', (req, res, next) => new auth_middleware_1.default(req, res, next).auth(), (req, res) => new TaskController_1.default().getAllByUser(req, res));
router.get('/:id', (req, res, next) => new auth_middleware_1.default(req, res, next).auth(), (req, res) => new TaskController_1.default().getById(req, res));
router.patch('/:id', (req, res, next) => new auth_middleware_1.default(req, res, next).auth(), (req, res) => new TaskController_1.default().updateTask(req, res));
router.delete('/:id', (req, res, next) => new auth_middleware_1.default(req, res, next).auth(), (req, res) => new TaskController_1.default().deletTask(req, res));
router.post('/', (req, res, next) => new auth_middleware_1.default(req, res, next).auth(), (req, res) => new TaskController_1.default().createTask(req, res));
exports.default = router;
//# sourceMappingURL=TaskRouter.js.map