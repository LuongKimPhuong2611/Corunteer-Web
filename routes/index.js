const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
	if (req.isUnauthenticated()) return res.render('../views/index.ejs', { loggedin: false });
	return res.render('../views/index.ejs', { loggedin: true, user: req.user });
});
module.exports = router;
