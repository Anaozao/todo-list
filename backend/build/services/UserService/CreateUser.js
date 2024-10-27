"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const dotenv = require("dotenv");
const Nodemailer_1 = require("../../utils/Nodemailer");
const SequelizeUser_1 = require("../../database/models/SequelizeUser");
const createUserValidation_1 = require("./Validations/createUserValidation");
const jwtUtils_1 = require("../../utils/jwtUtils");
dotenv.config();
const { ORIGIN_EMAIL } = process.env;
const { FRONT_BASE_URL } = process.env;
const createNewUser = async (newUserData) => {
    const { email, password, username } = newUserData;
    const hashedPass = await (0, bcryptjs_1.hash)(password, 10);
    const newUser = {
        email,
        username,
        password: hashedPass,
        isActive: false,
    };
    return newUser;
};
const createdUser = ({ email, id, isActive, username }) => {
    const user = {
        id,
        email,
        username,
        isActive,
    };
    return user;
};
const mailOptions = (email, verificationLink) => {
    const options = {
        from: ORIGIN_EMAIL,
        to: email,
        subject: 'Confirmação de cadastro',
        text: `
    Clique no link a seguir para confirmar seu cadastro, 
    se não foi você que fez a solicitação, ignore este e-mail: ${verificationLink}
  `,
    };
    return options;
};
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
        const { dataValues } = await this.model
            .create(await createNewUser({ email, password, username }));
        const newUser = createdUser(dataValues);
        const token = new jwtUtils_1.default().createToken(newUser, '');
        const verificationLink = `${FRONT_BASE_URL}/verificar-email?token=${token}`;
        Nodemailer_1.default.sendMail(mailOptions(email, verificationLink))
            .then((mailInfo) => {
            if (mailInfo.rejected.length > 0) {
                return { status: 'FAIL', data: { message: 'Falha ao cadastrar o email' } };
            }
        }).catch((_error) => ({ status: 'FAIL', data: { message: 'Erro ao enviar o e-mail' } }));
        return { status: 'CREATED', data: newUser };
    }
}
exports.default = CreateUser;
//# sourceMappingURL=CreateUser.js.map