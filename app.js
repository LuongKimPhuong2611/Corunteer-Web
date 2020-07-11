const express = require('express');
const app = express();
const AuthRoute = require('./routes/auth');
const RestAPIRoute = require('./routes/api');
const TestRoute = require('./routes/test');
const passport = require('passport');
const Initialize = require('./config/passport-config');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
const RedisURL = process.env.REDIS_URL;

const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
const redisStore = require('connect-redis')(session);

const User = require('./models/User');
const Group = require('./models/Group');
const Activity = require('./models/Activity');
const Action = require('./models/Action');
const GroupAction = require('./models/GroupAction');
const UserActivity = require('./models/UserActivity');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderDetail = require('./models/OrderDetail');
const sequelize = require('./config/sequelize-config');

app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express session
redisClient.on('error', (err) => {
	console.log('Redis error: ', err);
});
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: true,
		store: new redisStore({ url: RedisURL, client: redisClient, ttl: 86400 }),
	})
);

// Passport middleware
Initialize(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/test', TestRoute);
app.use('/user', AuthRoute);
app.use('/api/activity', RestAPIRoute.Activities);

app.get('/', (req, res) => {
	res.render('index');
});
app.listen(port, () => console.log('Server Up and Running on Port: ' + port));
