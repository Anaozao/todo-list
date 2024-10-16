"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-lines-per-function */
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('tasks', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: 'user_id',
            },
            description: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            isDone: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                field: 'is_done',
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('tasks');
    },
};
//# sourceMappingURL=2-create-tasks.js.map