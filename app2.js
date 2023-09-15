const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

// database
const mongoConnect = require('./util/mongodb').mongoConnect;

const app = express();

// routes
const userRoute = require('./routes/user');
const expensRoute = require('./routes/expense');
const purchaseRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premium');
const forgotPasswordRoute = require('./routes/forgot_password');


// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/user',userRoute);
app.use('/premium',premiumRoute);

app.use('/expense',expensRoute);
app.use(forgotPasswordRoute);
app.use('/purchase',purchaseRoute);

// serving index page
app.use('/',(req, res, next)=>{
    res.redirect("/user/sign_up");
});

mongoConnect(()=>{
    console.log("connected");
    app.listen(4000);
    
});


