const Sib = require('sib-api-v3-sdk');

require('dotenv').config()

const path = require("path");
const rootDir = require("../util/path");


exports.getForgotPassword = async (req, res, next)=>{

    res.sendFile(path.join(rootDir, "views", "forgot_password.html"));
}


exports.postForgotPassword = async (req, res, next)=>{

    console.log(req.body.email);
}