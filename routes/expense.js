const express = require('express');

const authantication = require('../middleware/auth');

const router = express.Router();

const expenseController = require('../controllers/expense');

router.get('/', expenseController.getIndex);

router.post('/add-expense', authantication.authantication, expenseController.postAddExpense);

router.get('/get-expenses', authantication.authantication, expenseController.getExpenses);

router.delete('/delete-expense/:expenseId', expenseController.deleteExpense);


module.exports = router;