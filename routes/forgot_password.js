const express = require('express');

// const authantication = require('../middleware/auth');

const router = express.Router();

const forgotPasswordController = require('../controllers/forgot_password');

router.get('/forgot-password', forgotPasswordController.getForgotPassword);

router.post('/forgot-password', forgotPasswordController.postForgotPassword);


module.exports = router;