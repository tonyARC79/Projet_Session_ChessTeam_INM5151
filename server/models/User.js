module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_registed: {
      field: 'date_registered',
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    date_deleted: {
      type: DataTypes.DATE,
      defaultValue: null
    }
  }, {
      sequelize,
      timestamps: false,
      freezeTableName: true
    });
  return User;
};