const Template = require('../../template/template.model');

module.exports = (sequelize, DataTypes) => {
  const Statistics = sequelize.define('Stats', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    delivers: DataTypes.INTEGER,
    rejects: DataTypes.INTEGER,
  }, {
    tableName: 'stats',
    timestamps: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
    underscored: true,
  });

  Statistics.belongsTo(Template);

  return Statistics;
};
