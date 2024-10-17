import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeUser from './SequelizeUser';

export default class SequelizeTask extends Model<InferAttributes<SequelizeTask>,
InferCreationAttributes<SequelizeTask>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare isDone: boolean;
  declare createdAt: Date;
  declare description: string;
}

SequelizeTask.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  isDone: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  modelName: 'tasks',
  timestamps: false,
  underscored: true,
});

SequelizeTask.belongsTo(SequelizeUser, { foreignKey: 'userId', as: 'user' });
SequelizeUser.hasMany(SequelizeTask, { foreignKey: 'userId', as: 'tasks' });
