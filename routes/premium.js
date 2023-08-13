const express = require('express');
const router = express.Router();
const premiumControllers = require('../controllers/premium');
const authentication = require('../middleware/auth');

router.get('/leaderboard',authentication.authantication, premiumControllers.getLeaderBoard);

module.exports = router;