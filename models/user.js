'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values:['male','female']
    },
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    
  };
  return User;
};