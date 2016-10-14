//File: controllers/steps.js
var gateway = require('../gateway');
var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Tours = mongoose.model('Tours');
var Subscriptions = mongoose.model('Subscriptions');

//GET - Return all Steps in the DB
exports.get = function(req, res) {


    if (req.user && req.user.email) {
        Subscriptions.findOne({
            email: req.user.email
        }, function(err, subscription) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(subscription);
        });
    } else {
        res.status(403).send('forbiden');
    }


};

//GET - Return a Step with specified ID
exports.cancel = function(req, res) {

    if (req.user && req.user.email) {

        Subscriptions.findOne({
            email: req.user.email
        }, function(err, subscription) {
            if (err || !subscription) return res.send(500, err.message);

            gateway.subscription.cancel(subscription.subscriptionId, function(err, result) {
                subscription.remove(function(err) {
                    if (err) return res.send(500, err.message);

                    Users.findOne({
                        email: req.user.email
                    }, function(err, user) {

                        if (err) return res.send(500, err.message);

                        for (var i = 0; i < user.apps.length; i++) {

                            user.apps[i].active = true;

                            if (i >= 1) {
                                user.apps[i].active = false;
                            }



                            console.log('saving user.app' + user.apps[i].active);

                        }

                        var _excludeAppId = (user && user.apps && user.apps[0] && user.apps[0].appId) ? user.apps[0].appId : "";

                        Tours.update({
                            "$and": [{
                                owner: user._id
                            }, {
                                "$nor": [{
                                    id: _excludeAppId
                                }]
                            }]
                        }, {
                            active: false
                        }, {
                            multi: true
                        }, function(err, result) {

                            if (err) return res.status(500).send(err.message);

                            user.markModified('apps');
                            user.save(function(err, tour) {
                                if (err) return res.status(500).send(err.message);
                                res.status(200).send();
                            });

                        });

                    });

                });
            });

        });

    } else {
        res.status(403).send('forbiden');
    }

};
