"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountRecoveryService_1 = require("../services/AccountRecoveryService/AccountRecoveryService");
const mapStatusHTTP_1 = require("../utils/mapStatusHTTP");
class AccountRecoveryController {
    constructor() {
        this.service = new AccountRecoveryService_1.default();
    }
    async recovery(req, res) {
        const { email } = req.body;
        const { status, data } = await this.service.resetPass(email);
        return res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
}
exports.default = AccountRecoveryController;
//# sourceMappingURL=AccountRecoveryController.js.map