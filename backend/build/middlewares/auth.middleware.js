"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = require("../utils/jwtUtils");
class Auth {
    constructor(req, res, next) {
        this.jwt = new jwtUtils_1.default();
        this.authorization = req.headers.authorization;
        this.req = req;
        this.res = res;
        this.next = next;
    }
    auth() {
        if (!this.authorization) {
            return this.res.status(401).json({ message: 'Token não encontrado' });
        }
        try {
            const token = this.authorization.split(' ')[1];
            const user = this.jwt.validateToken(token);
            if (!user) {
                return this.res.status(401).json({ message: 'Token precisa ser um token valido' });
            }
            this.req.user = user;
            this.next();
        }
        catch (e) {
            return this.res.status(401).json({ message: 'Token precisa ser um token valido' });
        }
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.middleware.js.map