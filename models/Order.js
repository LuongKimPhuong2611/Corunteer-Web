const sequelize = require('../config/sequelize-config');
const { Sequelize, Model, DataTypes } = require('sequelize');
const User = require('./User');

const Order = sequelize.define('Order', {
	OrderID: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	PurchaserID: {
		type: DataTypes.UUID,
	},
});

User.hasMany(Order, { foreignKey: 'PurchaserID', sourceKey: 'UserID' });
Order.belongsTo(User, { foreignKey: 'PurchaserID', targetKey: 'UserID' });

module.exports = Order;
