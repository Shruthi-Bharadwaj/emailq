module.exports = (sequelize, DataTypes) => {
  const EmailIdentity = sequelize.define('EmailIdentity', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    Email: DataTypes.STRING,
    IsVerified: DataTypes.BOOLEAN,
  }, {
    tableName: 'email_identities',
    timestamps: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt',
  });

  EmailIdentity.associate = (db) => {
    EmailIdentity.belongsTo(db.User, {
      foreignKey: 'UserId',
    });
  };

  return EmailIdentity;
};
