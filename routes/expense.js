const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');

router.get('/', expenseController.getIndex);


module.exports = router;