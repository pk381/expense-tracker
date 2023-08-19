const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.authantication = async (req, res, next)=>{

    try{
        let token = req.header('Authorization')
        // console.log(token);
        const userObj = jwt.verify(token,'secretKey');
        // console.log("user ", userObj);
        const user = await User.findByPk(userObj.id);
        console.log(user.id);
        req.user = user;
        next();
    }
    catch(err){
        console.log(err);
    }
}