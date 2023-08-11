const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');

router.get('/', expenseController.getIndex);

router.post('/add-expense', expenseController.postAddExpense);

router.get('/get-expenses', expenseController.getExpenses);
router.delete('/delete-expense/:id', expenseController.deleteExpense);

module.exports = router;