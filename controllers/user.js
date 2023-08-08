const path = require('path');
const rootDir = require('../util/path');

const User = require('../models/user');

exports.getSignUp = (req, res, next)=>{

    res.sendFile(path.join(rootDir, "views", "sign_up.html"));
    
}

exports.getLogin = (req, res, next)=>{

    res.sendFile(path.join(rootDir, "views", "login.html"));
}

exports.postSignUp = async (req, res, next)=>{

    try{

        const existingUser = await User.findByPk(req.body.email);

        console.log(existingUser);

        if(existingUser === null){

            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            res.status(201).json({user: user});
        }
        else{

            res.status(201).json({user: 'userExist'});
        }
    
    }
    catch(err){

        console.log(err);
    }
    
}