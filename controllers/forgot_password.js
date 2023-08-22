
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();
const path = require("path");
const rootDir = require("../util/path");
const uuid = require('uuid');
const ForgotPassword = require('../models/forgot_password');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getForgotPassword = async (req, res, next)=>{

    res.sendFile(path.join(rootDir, "views", "forgot_password.html"));
}


exports.postForgotPassword = async (req, res, next)=>{

    const email = req.body.email;

    try{
        const user = User.findOne({where:{email}});

        if(user){

            const forgotPasswordCreate = await ForgotPassword.create({
                id: uuid.v4(),
                active: true,
                userId: user.id
            });

            // 
            const client = Sib.ApiClient.instance;
            const apiKey = client.authentications['api-key'];

            apiKey.apiKey = 'xsmtpsib-67e2aa4649354c2b8fd2a976f88a9ad811891c90efbf83df3a9aeaad398824e2-RJIc3zYf9WNTyZQD';

            const tranEmailApi = new Sib.TransactionalEmailsApi();

            const sender = {email: 'kumarprabhat0023@gmail.com'};
            const receivers = [{email: 'prabhat_b190521cs@nitc.ac.in'}];

            await tranEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: 'forgot password',
                textContent: `reset your password`,
                htmlContent:`http://localhost:4000/reset-password/${forgotPasswordCreate.id}`
             });
        }
    }
    catch(err){
        console.log(err);
    }
}

exports.getResetPassword = async (req, res, next)=>{

    const forgotPasswordId = req.params.id;

    try{

        const forgotPassword = await ForgotPassword.findByPk(forgotPasswordId);

        if(forgotPassword){

            await forgotPassword.update({active: false});

            res.status(200).send(`<html>
                <script>
                    function formsubmitted(e){
                        e.preventDefault();
                        console.log('called')
                    }
                </script>
                <form action="/update-password/${forgotPasswordId}" method="get">
                    <label for="newpassword">Enter New password</label>
                    <input name="newpassword" type="password" required></input>
                    <button type="submit">reset password</button>
                </form>
            </html>`
            );
        }

    }
    catch(err){
        console.log(err);
    }
}

exports.getUpdatedPassword = async (req, res, next)=>{

    const id = req.params.id;

    const newPassword = req.query.newpassword;

    try{

        const details = await ForgotPassword.findByPk(id);
        const user = await User.findByPk(details.userId);
    
        bcrypt.hash(newPassword, 10, async (err, hash)=>{

            if(err){
                console.log(err);
            }
            else{
                await user.update({password: hash});
            }
        });
        res.status(201).json({message: "password updated successfully"});
    }
    catch(err){
        console.log(err);
    }
}