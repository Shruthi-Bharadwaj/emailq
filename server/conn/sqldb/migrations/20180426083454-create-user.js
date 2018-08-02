
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    Username: Sequelize.STRING,
    Password: Sequelize.STRING,
    CreatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    UpdatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('users'),
};
