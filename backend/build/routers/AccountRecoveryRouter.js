"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AccountRecoveryController_1 = require("../controllers/AccountRecoveryController");
const router = (0, express_1.Router)();
const accountRecoveryController = new AccountRecoveryController_1.default();
router.post('/', (_req, res) => accountRecoveryController.recovery(_req, res));
exports.default = router;
//# sourceMappingURL=AccountRecoveryRouter.js.map