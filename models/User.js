const sequelize = require('../config/sequelize-config');
const { Sequelize, Model, DataTypes } = require('sequelize');

const User = sequelize.define(
	'User',
	{
		UserID: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		Username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		Password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		DisplayName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		GroupName: {
			type: DataTypes.STRING,
			defaultValue: 'User',
		},
	},
	{
		defaultScope: {
			attributes: { exclude: ['Password'] },
		},
		scopes: {
			withPassword: {
				attributes: {},
			},
		},
	}
);
module.exports = User;
