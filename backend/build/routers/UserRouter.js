"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => new auth_middleware_1.default(req, res, next).auth(), (req, res) => new UserController_1.default().getAll(req, res));
router.get('/:id', (req, res, next) => new auth_middleware_1.default(req, res, next).auth(), (req, res) => new UserController_1.default().getUser(req, res));
router.post('/', (req, res) => new UserController_1.default().createUser(req, res));
router.post('/change-password', (req, res) => new UserController_1.default().changePassword(req, res));
exports.default = router;
//# sourceMappingURL=UserRouter.js.map