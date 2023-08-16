const User = require("../models/user");
const Expense = require("../models/expense");
const sequelize = require("../util/database");
const AWS = require("aws-sdk");

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

function uploadToS3(data, filename) {
  const bucketName = "expensetrackerprabhat";

  let s3Bucket = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  var params = {
    Bucket: bucketName,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(res.Location);
      }
    });
  });
}
exports.getDownload = async (req, res, next) => {

  try {
    const expeses = await req.user.getExpenses();

    const stringifiedExpense = JSON.stringify(expeses);

    const date = new Date();

    const filename = `Expense_${
      req.user.id
    }_${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/${date.getTime()}.txt`;
    const url = await uploadToS3(stringifiedExpense, filename);

    res.status(201).json({ url: url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ url: null, err: err });
  }
};
