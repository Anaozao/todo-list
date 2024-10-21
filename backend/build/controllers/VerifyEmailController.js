"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapStatusHTTP_1 = require("../utils/mapStatusHTTP");
const VerifyEmailService_1 = require("../services/VerifyEmail/VerifyEmailService");
class VerifyEmailController {
    constructor() {
        this.veifyService = new VerifyEmailService_1.default();
    }
    async verify(req, res) {
        const { token } = req.query;
        const { status, data } = await this.veifyService.verify(String(token));
        res.status((0, mapStatusHTTP_1.mapStatusHTTP)(status)).json(data);
    }
}
exports.default = VerifyEmailController;
//# sourceMappingURL=VerifyEmailController.js.map