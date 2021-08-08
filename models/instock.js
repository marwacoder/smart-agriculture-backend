'use strict';
module.exports = (sequelize, DataTypes) => {
  const InStock = sequelize.define('InStock', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    totalFund: DataTypes.DOUBLE
  }, {});
  InStock.associate = function(models) {
    // associations can be defined here
  };
  return InStock;
};