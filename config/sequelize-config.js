const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

//MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	connectionLimit: 10,
	dialect: 'mysql',
});
// api gateway
// //PostgreSQL
// const sequelize = new Sequelize({
// 	host: 'localhost',
// 	port: '5432',
// 	user: 'postgres',
// 	username: 'postgres',
// 	password: '1',
// 	database: 'demo',
// 	dialect: 'postgres',
// 	protocol: 'postgres',
// 	logging: true,
// });

// //MSSQL
// const sequelize = new Sequelize('Demo', 'ndmnhat', '123456', {
// 	host: 'localhost',
// 	dialect: 'mssql',
// });

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

// sequelize.import('../models/User');
// sequelize.import('../models/Action');
// sequelize.import('../models/Activity');
// sequelize.import('../models/Group');
// sequelize.import('../models/GroupAction');
// sequelize.import('../models/UserActivity');
// sequelize.import('../models/Order');
// sequelize.import('../models/Product');
// sequelize.import('../models/ProductDetail');
// sequelize.import('../models/OrderDetail');

module.exports = sequelize;
