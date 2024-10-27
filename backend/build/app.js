"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const UserRouter_1 = require("./routers/UserRouter");
const TaskRouter_1 = require("./routers/TaskRouter");
const LoginRouter_1 = require("./routers/LoginRouter");
const VerifyEmailRouter_1 = require("./routers/VerifyEmailRouter");
const AccountRecoveryRouter_1 = require("./routers/AccountRecoveryRouter");
const frontUrl = process.env.FRONT_BASE_URL;
const corsOptions = {
    origin: frontUrl,
    optionSuccessStatus: 200,
};
class App {
    constructor() {
        this.app = express();
        this.config();
        this.app.get('/', (req, res) => res.json({ ok: true }));
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(accessControl);
        this.app.use('/users', UserRouter_1.default);
        this.app.use('/tasks', TaskRouter_1.default);
        this.app.use('/login', LoginRouter_1.default);
        this.app.use('/verify-email', VerifyEmailRouter_1.default);
        this.app.use('/recovery-account', AccountRecoveryRouter_1.default);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.App = App;
// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
exports.app = new App().app;
//# sourceMappingURL=app.js.map