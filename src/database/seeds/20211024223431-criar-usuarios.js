const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'Luiz',
          email: 'luiz1@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Luiz2',
          email: 'luiz2@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Luiz3',
          email: 'luiz3@email.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: () => {},
};
