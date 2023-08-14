const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../util/database");

exports.getLeaderBoard = async (req, res, next) => {

  try {
    const expenses = await Expense.findAll();
    const users = await User.findAll();

    const userExpense = {};

    expenses.forEach((expense) => {
      if (userExpense[expense.userId]) {
        userExpense[expense.userId] += expense.amount;
      } else {
        userExpense[expense.userId] = expense.amount;
      }
    });
    let userLeaderBoard = [];
    users.forEach((user) => {
      userLeaderBoard.push({
        name: user.name,
        total_cost: userExpense[user.id] || 0,
      });
    });

    userLeaderBoard.sort((a, b) => b.total_cost - a.total_cost);
    res.status(201).json(userLeaderBoard);
  } catch (err) {
    console.log(err);
  }

};

exports.isPremiumUser = async (req, res, next) => {
  console.log("is Premium User");
};
