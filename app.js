const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const sequelize = require('./util/database'); // database

const app = express();

// database
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');

// routes
const userRoute = require('./routes/user');
const expensRoute = require('./routes/expense');
const purchsseRoute = require('./routes/purchase');

// static files/
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/user',userRoute);

app.use(expensRoute);
app.use('/purchase',purchsseRoute);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(res=>{
    console.log("listining");
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
})
