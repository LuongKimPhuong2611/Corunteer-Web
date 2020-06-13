const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (passport) => {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			const user = await User.scope('withPassword').findOne({ where: { Username: username } });
			if (user === null) {
				return done('Invalid Username');
			}
			const validPass = await bcrypt.compare(password, user.Password);
			if (!validPass) return done('Password incorrect');

			//remove Password field
			let result = user.toJSON();
			delete result.Password;

			console.log(result);
			return done(null, result);
		})
	);
	passport.use(
		new JWTStrategy(
			{
				jwtFromRequest: (req) => req.cookies.jwt,
				secretOrKey: process.env.TOKEN_SECRET,
			},
			(jwtPayload, done) => {
				return done(null, jwtPayload.userid);
			}
		)
	);
	passport.serializeUser(async (user, done) => {
		done(null, user.UserID);
	});

	passport.deserializeUser(async (id, done) => {
		const user = await User.findByPk(id);
		done(null, user);
	});
};
