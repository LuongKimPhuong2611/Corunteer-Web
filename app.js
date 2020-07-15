const express = require('express');
const app = express();
const path = require('path');
const AuthRoute = require('./routes/auth');
const RestAPIRoute = require('./routes/api');
const TestRoute = require('./routes/test');
const IndexRoute = require('./routes/index');
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
app.set('views', path.join(__dirname, 'views'));

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

app.use('/resources', express.static('views/resources'));
app.use('/views/vendor', express.static('views/vendor'));

app.use('/test', TestRoute);
app.use('/user', AuthRoute);
app.use('/api/activity', RestAPIRoute.Activities);

app.use('/', IndexRoute);
app.listen(port, () => console.log('Server Up and Running on Port: ' + port));

// login
const loginLink = document.querySelector(".login-link");
const form = document.querySelector(".form-login");
loginLink.addEventListener('click',()=>{
	form.classList.toggle('active');
})
