"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = require("../controllers/LoginController");
const router = (0, express_1.Router)();
const loginController = new LoginController_1.default();
router.post('/', (_req, res) => loginController.login(_req, res));
exports.default = router;
//# sourceMappingURL=LoginRouter.js.map