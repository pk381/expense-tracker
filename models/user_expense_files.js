const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserExpenseFiles = sequelize.define('userExpenseFiles',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    fileUrl:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    }
});

module.exports = UserExpenseFiles;