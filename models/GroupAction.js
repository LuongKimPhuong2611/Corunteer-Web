const sequelize = require('../config/sequelize-config');
const { Sequelize, Model, DataTypes } = require('sequelize');
const Group = require('./Group');
const Action = require('./Action');

const GroupAction = sequelize.define('GroupAction', {
	GroupID: {
		type: DataTypes.UUID,
		primaryKey: true,
		references: {
			model: Group,
			key: 'GroupID',
		},
	},
	ActionID: {
		type: DataTypes.UUID,
		primaryKey: true,
		references: {
			model: Action,
			key: 'ActionID',
		},
	},
});

Action.belongsToMany(Group, {
	through: GroupAction,
	foreignKey: 'ActionID',
	otherKey: 'GroupID',
});
Group.belongsToMany(Action, {
	through: GroupAction,
	foreignKey: 'GroupID',
	otherKey: 'ActionID',
});

module.exports = GroupAction;
