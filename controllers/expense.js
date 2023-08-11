const path = require("path");
const rootDir = require("../util/path");
const Expense = require('../models/expense');

exports.getIndex = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "index.html"));
};


exports.postAddExpense = async (req, res, next) => {

  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;

  console.log("reqbody ", req.body);

  try {
    const expense = await Expense.create({
      amount: amount,
      description: description,
      category: category
    });

    res.status(201).json({ expense: expense });
  } catch(err) {
    console.log(err);
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.status(201).json({ expenses: expenses });
  } catch {
    console.log("err2");
  }
};

exports.deleteExpense = async (req, res, next) => {

  try {
    const id = req.params.id;
    await Expense.destroy({ where: { id: id } });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};