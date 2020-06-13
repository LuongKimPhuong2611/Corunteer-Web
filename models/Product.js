const sequelize = require('../config/sequelize-config');
const { Sequelize, Model, DataTypes } = require('sequelize');
const Activity = require('./Activity');

const Product = sequelize.define('Product', {
	ProductID: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	ActivityID: {
		type: DataTypes.UUID,
	},
	ProductName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	Price: {
		type: DataTypes.BIGINT,
		allowNull: false,
	},
	Description: {
		type: DataTypes.TEXT,
		defaultValue: '',
	},
});

Activity.hasMany(Product, {
	foreignKey: 'ActivityID',
	sourceKey: 'ActivityID',
});
Product.belongsTo(Activity, { foreignKey: 'ActivityID', targetKey: 'ActivityID' });

module.exports = Product;
