const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const sequelize = require('./util/database'); // database

const app = express();

// routes
const userRoute = require('./routes/user');

// static files/
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/user',userRoute);

sequelize.sync()
.then(res=>{
    // console.log(res);
    console.log("listining");
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
})
