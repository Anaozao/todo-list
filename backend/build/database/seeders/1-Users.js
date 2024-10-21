"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('users', [
            {
                username: 'Túlio',
                email: 'tulio@email.com',
                password: (0, bcryptjs_1.hashSync)('senhaforte', 10),
                is_active: true
            },
        ], {});
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', {});
    },
};
//# sourceMappingURL=1-Users.js.map