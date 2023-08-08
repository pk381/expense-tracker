const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/sign_up', userController.signUp);

module.exports = router;