const express = require('express');
const app = express();


// routes
const userRoute = require('./routes/user');

app.use(userRoute);
console.log("listining");

app.listen(4000);