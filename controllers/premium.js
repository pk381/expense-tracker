const User = require("../models/user");
// const Expense = require("../models/expense");
// const sequelize = require("../util/database");
// const AWS = require("aws-sdk");

const S3services = require('../services/S3services');

exports.getLeaderBoard = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["name", "totalAmount"],
    });

    let leaderBoard = [];

    users.forEach((user) => {
      leaderBoard.push({
        name: user.name,
        totalExpense: user.totalAmount || 0,
      });
    });

    leaderBoard.sort((a, b) => b.totalExpense - a.totalExpense);

    res.status(201).json(leaderBoard);
  } catch (err) {
    console.log(err);
  }
};

exports.isPremiumUser = async (req, res, next) => {
  console.log("is Premium User");
};


exports.getDownload = async (req, res, next) => {

  try {
    const expeses = await req.user.getExpenses();

    const stringifiedExpense = JSON.stringify(expeses);

    const date = new Date();

    const filename = `Expense_${
      req.user.id
    }_${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/${date.getTime()}.txt`;
    const url = await S3services.uploadToS3(stringifiedExpense, filename);

    res.status(201).json({ url: url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ url: null, err: err });
  }
};
