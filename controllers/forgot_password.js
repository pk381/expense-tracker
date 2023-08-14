const Sib = require('sib-api-v3-sdk');

require('dotenv').config()

const path = require("path");
const rootDir = require("../util/path");


exports.getForgotPassword = async (req, res, next)=>{

    res.sendFile(path.join(rootDir, "views", "forgot_password.html"));
}


exports.postForgotPassword = async (req, res, next)=>{

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];

    apiKey.apiKey = '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';

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {email: 'kumarprabhat0023@gmail.com'};
    const receivers = [{email: 'prabhat_b190521cs@nitc.ac.in'}];

    tranEmailApi.sendTransacEmail({
       sender,
       to: receivers,
       subject: 'forgot password',
       textContent: `reset your password`
    })
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err);
    })

    console.log(req.body.email);
}