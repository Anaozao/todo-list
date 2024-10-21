"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const SequelizeUser_1 = require("./SequelizeUser");
class SequelizeTask extends sequelize_1.Model {
}
exports.default = SequelizeTask;
SequelizeTask.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: sequelize_1.DataTypes.STRING,
    userId: sequelize_1.DataTypes.INTEGER,
    createdAt: sequelize_1.DataTypes.DATE,
    isDone: sequelize_1.DataTypes.BOOLEAN,
}, {
    sequelize: _1.default,
    modelName: 'tasks',
    timestamps: false,
    underscored: true,
});
SequelizeTask.belongsTo(SequelizeUser_1.default, { foreignKey: 'userId', as: 'user' });
SequelizeUser_1.default.hasMany(SequelizeTask, { foreignKey: 'userId', as: 'tasks' });
//# sourceMappingURL=SequelizeTask.js.map