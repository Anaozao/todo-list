"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
exports.default = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('users', [
            {
                username: 'testUser1',
                email: 'testUser1@email.com',
                password: (0, bcryptjs_1.hashSync)('password', 10),
            },
        ], {});
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('users', {});
    },
};
//# sourceMappingURL=1-Users.js.map