const sequelize = require('../config/sequelize-config');
const { Sequelize, Model, DataTypes } = require('sequelize');
const Order = require('./Order');
const Product = require('./Product');

const OrderDetail = sequelize.define('OrderProduct', {
	OrderID: {
		type: DataTypes.UUID,
		primaryKey: true,
		references: {
			model: Order,
			key: 'OrderID',
		},
	},
	ProductID: {
		type: DataTypes.UUID,
		primaryKey: true,
		references: {
			model: Product,
			key: 'ProductID',
		},
	},
});

Product.belongsToMany(Order, {
	through: OrderDetail,
	foreignKey: 'ProductID',
	otherKey: 'OrderID',
});
Order.belongsToMany(Product, {
	through: OrderDetail,
	foreignKey: 'OrderID',
	otherKey: 'ProductID',
});

module.exports = OrderDetail;
