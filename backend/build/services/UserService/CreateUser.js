"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const SequelizeUser_1 = require("../../database/models/SequelizeUser");
const createUserValidation_1 = require("./Validations/createUserValidation");
const jwtUtils_1 = require("../../utils/jwtUtils");
const nodemailer = require("nodemailer");
const console_1 = require("console");
const dotenv = require("dotenv");
dotenv.config();
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const ORIGIN_EMAIL = process.env.ORIGIN_EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;
class CreateUser {
    constructor() {
        this.model = SequelizeUser_1.default;
    }
    async createUser(userData) {
        const { email, password, username } = userData;
        const error = (0, createUserValidation_1.default)(userData);
        if (error)
            return { status: error.status, data: { message: error.message } };
        const userExists = await this.model.findOne({ where: { email: userData.email } });
        if (userExists)
            return { status: 'INVALID_VALUE', data: { message: 'Email já cadastrado' } };
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
        const newUser = {
            email,
            username,
            password: hashedPassword,
            isActive: false
        };
        const { dataValues } = await this.model.create(newUser);
        const createdUser = {
            id: dataValues.id,
            email: userData.email,
            username: userData.username,
            isActive: dataValues.isActive
        };
        const token = new jwtUtils_1.default().createToken(createdUser, '');
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: EMAIL_SERVICE,
            auth: {
                user: ORIGIN_EMAIL,
                pass: EMAIL_PASS
            }
        });
        const verificationLink = `http://localhost:5173/verify-email?token=${token}`;
        const mailOptions = {
            from: ORIGIN_EMAIL,
            to: email,
            subject: 'Confirmação de cadastro',
            text: `
        Clique no link a seguir para confirmar seu cadastro, 
        se não foi você que fez a solicitação, ignore este e-mail: ${verificationLink}
      `
        };
        try {
            const mailInfo = await transporter.sendMail(mailOptions);
            (0, console_1.log)(mailInfo);
            if (mailInfo.rejected.length > 0) {
                return { status: 'FAIL', data: { message: 'Falha ao cadastrar o email' } };
            }
            return { status: 'CREATED', data: createdUser };
        }
        catch (error) {
            (0, console_1.log)('Erro ao enviar email:', error);
            return { status: 'FAIL', data: { message: 'Erro ao enviar email' } };
        }
    }
}
exports.default = CreateUser;
//# sourceMappingURL=CreateUser.js.map