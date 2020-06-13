const passport = require('passport');
const router = require('express').Router();

router.get('/', (req, res, next) => {
	if (req.isUnauthenticated()) {
		return res.send('Unathenticated');
	}
	return res.send('ok');
});

module.exports = router;
