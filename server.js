var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//config
app.set('port', process.env.PORT || 8080);
app.use('/', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to database
var mongoose = require('mongoose');
//for local testing
mongoose.connect('mongodb://127.0.0.1:27017/ecdb');
var User = require('./models/user');
var Commodity = require('./models/commodity');

//RESTful API services
app.get('/api/listing', function (req, res) {
    Commodity.find(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

app.post('/api/login', function (req, res) {
    var email = req.body.email;
    var pwd = req.body.pwd;
    User.findOne({email: email}, function(err, user) {
        if (err) throw err;
        else if (!email) res.send('Please enter a valid email.');
        else if (!pwd) res.send('Please enter your password.');
        else if (!user) res.send('User not found.');
        else if (pwd === user.password) {
            res.json(user);
        } else {
            res.send('Invalid login. Please check your credentials.');
        }    
    });
});

app.post('/api/signup', function (req, res) {
    var email = req.body.email;
    var pwd = req.body.pwd;
    var fullname = req.body.fullname;
    var i = fullname.indexOf(" ");
    var firstName = fullname.slice(0, i).trim();
    var lastName = fullname.slice(i+1).trim();
    //verify that the user hasn't registered
    User.findOne({email: email}, function(err, existingUser) {
        if (existingUser) res.send('User already exists. Please log in instead.');
        else {
            //create new User instance
            var user = new User ({
                _id: email,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: pwd
            });
            //saved to Mongo
            user.save(function(err, user) {
                if(err) console.log(err);
                else {
                    console.log(user.email + " " + "registered");
                    res.send('Registration successful.');
                }
            });
        }
    });
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//start server
port = app.get('port');
app.listen(port, function () {
    console.log('Server listening on localhost: ' + port);
});