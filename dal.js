const MongoClient = require('mongodb').MongoClient;
const url         = process.env.MONGODB_URI || 'mongodb://localhost:27017';
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create google user account
function googleCreate(name, email, googleId){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('googleUsers');
        const doc = {name, email, googleId, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// create user account
function create(name, email, password, accountChecking){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, accountChecking, lineOfCredit:[], transactions:[]};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find google user account
function googleFind(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('googleUsers')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find google user account
function googleFindOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('googleUsers')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount for googleusers
function googleUpdate(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('googleUsers')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// update - deposit/withdraw amount 
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// Create new loan
function createLoan(email, type, balance, lengthOfLoan){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $push: { lineOfCredit: {type:type, balance: balance, length: lengthOfLoan}}},
                {  returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// Push transaction
function addTransaction(email, type, transactionAmount, date){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $push: { transactions: {type:type, transactionAmount:transactionAmount, date:date}}},
                {  returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}


module.exports = {create, findOne, find, update, all, googleCreate, googleFind, googleFindOne, googleUpdate, createLoan, addTransaction};