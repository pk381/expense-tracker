const path = require("path");
const rootDir = require("../util/path");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

function generateToken(id){

  return jwt.sign({id: id}, 'secretKey');
}

const User = require("../models/user");

exports.getSignUp = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "sign_up.html"));
};

exports.getLogin = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "login.html"));
};

exports.postLogin = async (req, res, next) => {
  try {
    console.log(req.body.email);

    const existingUser = await User.findByPk(req.body.email);

    console.log(existingUser.email);

    if (existingUser === null) {
      res.status(401).json({ message: "user not exist" });
    } else{

        const password = existingUser.password;
        bcrypt.compare(req.body.password, password, async (err, result)=>{

            console.log("err", err);
            
            if(result === true){
                res.status(201).json({message: "login sussessfully", token: generateToken(existingUser.email)});
            }
            else{
                res.status(401).json({message: "password did not match"});
            }
        })

    }
  } catch (err) {
    console.log(err);
  }
};

exports.postSignUp = async (req, res, next) => {
  try {
    const existingUser = await User.findByPk(req.body.email);

    console.log(existingUser);

    if (existingUser === null) {

        bcrypt.hash(req.body.password, 10, async (err, hash)=>{

            console.log(err);

            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });

            res.status(201).json({ user: user });

        })
    } else {
      res.status(201).json({ user: "userExist" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
