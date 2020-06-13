const passport = require('passport');
const Activity = require('../models/Activity');
const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth-config');

router.post('/create', ensureAuthenticated, async (req, res) => {
	if (req.user.GroupName == 'User') return res.sendStatus(401);

	Activity.create({
		CreatorID: req.user.UserID,
		Title: req.body.Title,
		Description: req.body.Description,
		StartDate: req.body.Startdate,
		EndDate: req.body.Enddate,
		Location: req.body.Location,
		Organizer: req.body.Organizer,
		OpenRegistrationDate: req.body.OpenRegistrationDate,
		EndRegistrationDate: req.body.EndRegistrationDate,
	});

	return res.sendStatus(200);
});

router.post('/delete', ensureAuthenticated, async (req, res) => {
	if (req.user.GroupName == 'User' || req.user.UserID != req.body.CreatorID) return res.sendStatus(401);

	Activity.destroy({ where: { ActivityID: req.body.ActivityID } });

	return res.sendStatus(200);
});

router.post('/update', ensureAuthenticated, async (req, res) => {
	if (req.user.GroupName == 'User' || req.user.UserID != req.body.CreatorID) return res.sendStatus(401);

	Activity.update(
		{
			Title: req.body.Title,
			Description: req.body.Description,
			StartDate: req.body.Startdate,
			EndDate: req.body.Enddate,
			Location: req.body.Location,
			Organizer: req.body.Organizer,
			OpenRegistrationDate: req.body.OpenRegistrationDate,
			EndRegistrationDate: req.body.EndRegistrationDate,
		},
		{
			where: { ActivityID: req.body.ActivityID },
		}
	);

	return res.sendStatus(200);
});
module.exports = router;
