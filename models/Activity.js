const sequelize = require('../config/sequelize-config');
const { Sequelize, Model, DataTypes } = require('sequelize');
const User = require('./User');

const Activity = sequelize.define('Activity', {
	ActivityID: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	CreatorID: {
		type: DataTypes.UUID,
	},
	Title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	Description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	StartDate: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	EndDate: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	Location: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	Organizer: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	OpenRegistrationDate: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
	EndRegistrationDate: {
		type: DataTypes.DATEONLY,
		allowNull: false,
	},
});

User.hasMany(Activity, { foreignKey: 'CreatorID', sourceKey: 'UserID' });
Activity.belongsTo(User, { foreignKey: 'CreatorID', targetKey: 'UserID' });

module.exports = Activity;
