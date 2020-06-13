const sequelize = require('../config/sequelize-config');
const { Sequelize, Model, DataTypes } = require('sequelize');

const Action = sequelize.define('Action', {
	ActionID: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	ActionName: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	ActionCode: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Action;
