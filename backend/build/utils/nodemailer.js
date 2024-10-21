"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const ORIGIN_EMAIL = process.env.ORIGIN_EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;
exports.transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: EMAIL_SERVICE,
    auth: {
        user: ORIGIN_EMAIL,
        pass: EMAIL_PASS
    }
});
//# sourceMappingURL=nodemailer.js.map