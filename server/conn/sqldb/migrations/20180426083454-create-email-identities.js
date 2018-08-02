
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('email_identities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    UserId: Sequelize.STRING,
    Email: Sequelize.STRING,
    IsVerified: Sequelize.BOOLEAN,
    CreatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    UpdatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('email_identities'),
};
