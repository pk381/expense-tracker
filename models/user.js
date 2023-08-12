const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user',{
    name:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,  
    },
    email:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false,
        primaryKey: true
    },
    password:{
        type: Sequelize.DataTypes.STRING,
        allowNull:false
    },
    ispremuimuser:Sequelize.DataTypes.BOOLEAN
});

module.exports = User;