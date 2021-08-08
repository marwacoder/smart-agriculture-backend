'use strict';
module.exports = (sequelize, DataTypes) => {
  const OutStock = sequelize.define('OutStock', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    totalFund: DataTypes.DOUBLE,
    driverId: DataTypes.STRING
  }, {});
  OutStock.associate = function(models) {
    // associations can be defined here
    
  };
  return OutStock;
};