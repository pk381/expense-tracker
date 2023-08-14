const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,  
    },
    email:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    isPremuimUser: Sequelize.DataTypes.BOOLEAN,
    totalAmount:Sequelize.DataTypes.INTEGER
});

module.exports = User;