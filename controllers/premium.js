const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.getLeaderBoard =async(req,res,next)=>{

    try{
        const leaderBoardUsers = await User.findAll({

            attributes: ['email', 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total_cost']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],

            group: ['expenses.userEmail']
        })

        res.status(200).json(leaderBoardUsers)
    }
    catch(err){
        console.log(err);
    }
}