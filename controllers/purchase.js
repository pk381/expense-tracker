const Razorpay = require('razorpay');
const Order = require('../models/order');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.purchasePremium =async(req,res,next)=>{

    console.log(req.user);
    try{
        let rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRECT
        })
        const amount=2500;
        const order = await rzp.orders.create({amount,currency:"INR"});

        await req.user.createOrder({orderId: order.id, status:"PENDING"});
        res.status(201).json({order,key_id: rzp.key_id})

    }
    catch(err){
        console.log(err);
    }
}

function generateAccessToken(id){
    return jwt.sign({id: id},'secretKey');
 }

exports.updateOrder = async(req,res,next)=>{
    try{

        const order_id = req.body.order_id;
        const payment_id = req.body.payment_id;
        const userId = req.user.id;

        const order = await Order.findOne({where:{orderId:order_id}})

        const promise1 = order.update({paymentId: payment_id, status:"SUCCESS"});
        const promise2 = req.user.update({isPremuimUser: true});

        await Promise.all([promise1,promise2]);

        res.status(201).json({message:"transition successfull", token: generateAccessToken(userId)});
    }
    catch(err){
        console.log(err);
    }
}


exports.updateFailure = async(req,res,next)=>{

    const order_id = req.body.order_id;
    
    const order =await Order.findOne({where:{orderId: order_id}});

    await order.update({status:"FAILURE"});
}