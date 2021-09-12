'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    name: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values: ['Male','Female'],
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    vehicleName: DataTypes.STRING,
    type: DataTypes.STRING,
    model: DataTypes.STRING,
    color: DataTypes.STRING,
    regNo: DataTypes.STRING
  }, {});
  Driver.associate = function(models) {
    // associations can be defined here
    Driver.hasMany(models.OutStock, {
      as: 'driver',
      foreignKey: 'driverId',
    })

   
  };
  return Driver;
};