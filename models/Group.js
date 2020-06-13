const sequelize = require('../config/sequelize-config');
const { Sequelize, Model, DataTypes } = require('sequelize');
const User = require('./User');

const Group = sequelize.define('Group', {
	GroupID: {
		type: DataTypes.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	GroupName: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});

Group.hasMany(User, { foreignKey: 'GroupName', sourceKey: 'GroupName' });
User.belongsTo(Group, { foreignKey: 'GroupName', targetKey: 'GroupName' });

module.exports = Group;
