const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/user/sign_up', userController.signUp);

router.post('/user/sign_up', userController.postSignUp);

module.exports = router;