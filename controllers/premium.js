const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../util/database");

exports.getLeaderBoard = async (req, res, next) => {

  try {

        const users = await User.findAll({
          attributes:['name','totalAmount']
      });

      let leaderBoard = [];

      users.forEach(user => {
          leaderBoard.push({name: user.name, totalExpense: user.totalAmount || 0});
      })
      
      leaderBoard.sort((a,b)=>b.totalExpense-a.totalExpense);

      res.status(201).json(leaderBoard);
  } catch (err) {
    console.log(err);
  }

};

exports.isPremiumUser = async (req, res, next) => {
  console.log("is Premium User");
};
