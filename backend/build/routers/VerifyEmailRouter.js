"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VerifyEmailController_1 = require("../controllers/VerifyEmailController");
const router = (0, express_1.Router)();
const verifyEmailController = new VerifyEmailController_1.default();
router.get('/', (_req, res) => verifyEmailController.verify(_req, res));
exports.default = router;
//# sourceMappingURL=VerifyEmailRouter.js.map