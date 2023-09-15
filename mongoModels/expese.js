const getDb = require('../util/mongodb').getDb;

const mongoDb = require('mongodb');

class Expense {

    constructor(amount, description, category, userId){
        this.amount = amount;
        this.description = description;
        this.category = category;
        this.userId = userId;
    }

    save(){

        const db = getDb();

        console.log(db);

        return db.collection('user').insertOne( this
            // name: 'name',
            // email: 'email',
            // password: 'password',
            // isPremiumUser: 'no',
            // totalExpense: 0
        )
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })

    }


    static fetchAll(){
        const db = getDb();
        return db.collection('user').find().toArray()
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
        });
    }


    static fetchById(expenseId){

        const db = getDb();

        return db.collection('user').find({_id: new mongoDb.ObjectId(expenseId)})
        .next()
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
        });

    }

    static update(expenseId){

        const db = getDb();

        return db.collection('user').updateOne({_id: new mongoDb.ObjectId(expenseId)}, {$set: {}})
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static deleteById(expenseId){

        const db = getDb();

        return db.collection('user').deleteOne({_id: new mongoDb.ObjectId(expenseId)})
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
        });
    }
}

module.exports = Expense;