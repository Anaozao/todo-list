"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class JwtUtils {
    constructor() {
        this.secret = process.env.JWT_SECRET || 'password';
    }
    createToken(payload, expiresIn) {
        if (expiresIn) {
            const token = jwt.sign(payload, this.secret, { expiresIn: expiresIn });
            return token;
        }
        const token = jwt.sign(payload, this.secret);
        return token;
    }
    validateToken(token) {
        const payload = jwt.verify(token, this.secret);
        return payload;
    }
}
exports.default = JwtUtils;
//# sourceMappingURL=jwtUtils.js.map