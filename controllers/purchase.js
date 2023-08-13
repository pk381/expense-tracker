const Razorpay = require('razorpay');
const Order = require('../models/order');
const jwt = require('jsonwebtoken');

console.log("key_id ",process.env.RAZORPAY_KEY_ID);

exports.purchasePremium =async(req,res,next)=>{
    try{
        let rzp = new Razorpay({
            key_id: 'rzp_test_OXhyzF1xWxvWDL',
            key_secret: 'ayPjTkScGBlT3I4z5Oy7Jun5'
        })
        const amount=2500;
        const order = await rzp.orders.create({amount,currency:"INR"});

        await req.user.createOrder({orderid:order.id,status:"PENDING"});
        res.status(201).json({order,key_id:rzp.key_id})

    }
    catch(err){
        console.log(err);
    }
}

function generateAccessToken(id,ispremuimuser){
    return jwt.sign({userId:id,ispremuimuser:ispremuimuser},'secretKey');
 }

exports.updateOrder = async(req,res,next)=>{
    try{
        const order_id = req.body.order_id;
        const payment_id=req.body.payment_id;
        const userId = req.user.id;
        const order =await Order.findOne({where:{orderid:order_id}})
        const promise1 =order.update({paymentid:payment_id,status:"SUCCESS"});
        const promise2=req.user.update({ispremuimuser:true});
        await Promise.all([promise1,promise2]);
        res.status(201).json({message:"transition successfull",token:generateAccessToken(userId,true)});
    }
    catch(err){
        console.log(err);
    }
}


exports.updateFailure = async(req,res,next)=>{
    const order_id = req.body.order_id;
    const order =await Order.findOne({where:{orderid:order_id}})
    await order.update({status:"FAILURE"});
}