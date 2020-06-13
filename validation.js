const Joi = require('@hapi/joi');

//Kiem tra dinh dang
const Validation = (data) => {
	const schema = Joi.object({
		username: Joi.string().min(6).max(25).required(),
		password: Joi.string().min(6).max(25).required(),
		displayname: Joi.string().max(255).required(),
		email: Joi.string().email(),
	});
	return schema.validate(data);
};
module.exports.Validation = Validation;
