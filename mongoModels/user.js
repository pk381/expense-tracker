const getDb = require('../util/mongodb').getDb;

const mongoDb = require('mongodb');

class User {

    constructor(name, email, password, isPremiumUser, totalExpense){
        this.name = name;
        this.email = email;
        this.password = password;
        this.isPremiumUser = isPremiumUser;
        this.totalExpense = totalExpense;
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


    static fetchById(userId){

        const db = getDb();

        return db.collection('user').find({_id: new mongoDb.ObjectId(userId)})
        .next()
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
        });

    }

    static update(userId){

        const db = getDb();

        return db.collection('user').updateOne({_id: new mongoDb.ObjectId(userId)}, {$set: {name: 'amamammama'}})
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static deleteById(userId){

        const db = getDb();

        return db.collection('user').deleteOne({_id: new mongoDb.ObjectId(userId)})
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
        });
    }
}

module.exports = User;