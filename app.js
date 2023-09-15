const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

// database
const sequelize = require('./util/database'); 
const mongoConnect = require('./util/mongodb').mongoConnect;

const app = express();

// database tables
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const ForgotPassword = require('./models/forgot_password');
const UserExpenseFiles = require('./models/user_expense_files');

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


//tables relations
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

User.hasMany(UserExpenseFiles);
UserExpenseFiles.belongsTo(User);


// syncing with database
sequelize.sync()
.then(res=>{
    
    console.log("listining");
    mongoConnect(()=>{
        app.listen(4000);
    });
})
.catch(err=>{
    console.log(err);
})
