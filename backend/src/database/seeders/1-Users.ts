/* eslint-disable max-lines-per-function */
import { QueryInterface } from 'sequelize';
import { hashSync } from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Túlio',
        email: 'tulio@email.com',
        password: hashSync('senhaforte', 10),
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  },
};
