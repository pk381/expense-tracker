const mongoConnect = require('./util/mongodb').mongoConnect;

const User = require('./mongoModels/user');

mongoConnect(()=>{
    console.log("connected");

    let mongoUser = new User('name','email', 'password', false, 0);

    mongoUser.save();
});


