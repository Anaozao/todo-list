/* eslint-disable max-lines-per-function */
import { Model, QueryInterface, DataTypes } from 'sequelize';
import ITask from '../../interfaces/ITask';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ITask>>('tasks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
      },
      description: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_done',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('tasks');
  },
};
