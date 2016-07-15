//File: controllers/steps.js
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

//GET - Return all Steps in the DB
exports.findAllUsers = function(req, res) {

    Users.find(function(err, users) {

        if (err) res.send(500, err.message);

        console.log('GET /users')
        res.status(200).jsonp(users);

    });

};

//GET - Return a Step with specified ID
exports.me = function(req, res) {

    if (req.user && req.user.email) {
        Users.findOne({
            email: req.user.email
        }, function(err, user) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(user);
        });
    } else {
        res.status(403).send('forbiden');
    }


};

//GET - Return a Step with specified ID
exports.findById = function(req, res) {

    Users.findById(req.params.email, function(err, user) {
        if (err) return res.send(500, err.message);

        console.log('GET /user/' + req.params.email);
        res.status(200).jsonp(user);
    });

};

//POST - Insert a new TVShow in the DB
exports.updateUser = function(req, res) {

    console.log('UPDATE');
    console.log(req.body);

    if (!req.user) {

        res.status(403).send('forbiden');

    } else {

        Users.findOne({
            email: req.user.email
        }, function(err, user) {
            if (err) return res.status(500).send(err.message);

            user.apiKey = req.body.apiKey;
            user.save(function(err, user) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(user);
            });

        });
    }

};


//POST - Insert a new TVShow in the DB
exports.addUser = function(req, res) {

    console.log('POST');
    console.log(req.body);

    var user = new Users({
        email: req.body.email,
        apiKey: req.body.apiKey
    });

    user.save(function(err, user) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(user);
    });
};
