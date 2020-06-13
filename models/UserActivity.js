const sequelize = require('../config/sequelize-config');
const { Sequelize, Model, DataTypes } = require('sequelize');
const User = require('./User');
const Activity = require('./Activity');

const UserActivity = sequelize.define('UserActivity', {
	ParticipantID: {
		type: DataTypes.UUID,
		primaryKey: true,
		references: {
			model: User,
			key: 'UserID',
		},
	},
	ActivityID: {
		type: DataTypes.UUID,
		primaryKey: true,
		references: {
			model: Activity,
			key: 'ActivityID',
		},
	},
});

Activity.belongsToMany(User, {
	through: UserActivity,
	foreignKey: 'ActivityID',
	otherKey: 'ParticipantID',
});
User.belongsToMany(Activity, {
	through: UserActivity,
	foreignKey: 'ParticipantID',
	otherKey: 'ActivityID',
});

module.exports = UserActivity;
