var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const jwt   = require("jsonwebtoken");
const res = require('express/lib/response');
const authorize = require('./authorization-middleware');
const path = require('path'); 
require('dotenv').config();

// used to serve static files from public directory
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

// create google user account
app.get('/account/googlecreate/:name/:email/:googleId', function (req, res) {

    // check if google account exists
    dal.googleFind(req.params.email).
        then((users) => {

            // if google user exists, return error message
            if(users.length > 0){
                console.log('User already exists');
                res.status(400).send('User already exists');    
            }
            else{
                // else create google user
                dal.googleCreate(req.params.name,req.params.email,req.params.googleId).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already exists');
                res.status(400).send('User already exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res, next) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    const payload= user[0];
                    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
                    const currUser = {...user[0], token}
                    // res.send(token);
                     res.send(currUser);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one google user by email
app.get('/account/googlefindOne/:email', function (req, res) {

    dal.googleFindOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});

// update - deposit/withdraw amount for google users
app.get('/account/googleupdate/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.googleUpdate(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

// all accounts
app.get('/account/all', authorize("customer:read"), function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('fullstack-bank-app/build'));
}

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Running on port: ' + port);