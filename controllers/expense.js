const path = require("path");
const rootDir = require("../util/path");
const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');

exports.getIndex = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "index.html"));
};


exports.postAddExpense = async (req, res, next) => {

  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;

  const transaction = await sequelize.transaction();

  try {
    const expense = await Expense.create({
      amount: parseInt(amount),
      description: description,
      category: category,
      userId: req.user.id
    },
    {transaction: transaction}
    );

    await User.update(
      { totalAmount: req.user.totalAmount + parseInt(amount)},
      { where: {id: req.user.id }, transaction: transaction}
      
    );
    
    await transaction.commit();
    res.status(201).json({ expense: expense });
  } catch(err) {

    await transaction.rollback();
    console.log(err);
  }
};

exports.getExpenses = async (req, res, next) => {

  try {
    const expenses = await Expense.findAll({where:{userId: req.user.id}});
    res.status(201).json({ expenses: expenses });
  } catch(err) {
    console.log("err2", err);
  }
};

exports.deleteExpense = async (req, res, next) => {

  const transaction = await sequelize.transaction();

  try {
    const id = req.params.expenseId;

    console.log(id);

    const expense = await Expense.findByPk(id);

    const user = await User.findOne({where: {id: expense.userId}});

    await Expense.destroy({ where: {id: id}, transaction: transaction });

    await User.update({totalAmount: user.totalAmount - expense.amount}, { where: {id: user.id}, transaction: transaction});

    await transaction.commit();

    res.sendStatus(200);

  } catch (err){

    await transaction.rollback();
    console.log(err);
    res.status(500).json(err);
  }
};