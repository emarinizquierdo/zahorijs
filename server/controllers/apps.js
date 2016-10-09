//File: controllers/steps.js
var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Tours = mongoose.model('Tours');
var Subscriptions = mongoose.model('Subscriptions');

//GET - Return all Steps in the DB
exports.findAllApps = function(req, res) {

    if (req && req.user) {
        Users.findOne({
            email: req.user.email
        }, function(err, user) {

            if (err) res.send(500, err.message);

            console.log('GET /Apps')
            res.status(200).jsonp(user.apps);

        });
    } else {
        res.status(403).send('forbiden');
    }


};

//POST - Insert a new TVShow in the DB
exports.updateApps = function(req, res) {

    console.log('UPDATE');
    console.log(req.body);

    if (req && req.user) {

        Users.findOne({
            email: req.user.email
        }, function(err, user) {

            if (err) res.send(500, err.message);

          console.log('GET /Apps')

            Subscriptions.findOne({
                email: req.user.email
            }, function(err, subscription) {

                if (err) res.send(500, err.message);

                var _active = (!subscription && user.apps.length > 0) ? false : true;

                updateApp(user.apps, {
                    appId: req.body.appId,
                    appName: req.body.appName,
                    timestamp: new Date().getTime(),
                    active : _active
                });

                user.save(function(err, user) {
                    if (err) return res.status(500).send(err.message);
                    res.status(200).jsonp(user.apps);
                });

              });


        });
    } else {
        res.status(403).send('forbiden');
    }

};

//DELETE - Insert a new Tours in the DB
exports.removeApp = function(req, res) {

    console.log('DELETE');
    console.log(req);

    if (req && req.user) {

        Users.findOne({
            email: req.user.email
        }, function(err, user) {

            if (err) return res.status(500).send(err.message);

            for (var i = 0; i < user.apps.length; i++) {
                console.log('el appid es: ' + user.apps[i].appId + " y el otro es " + req.params.id);
                if (user.apps[i].appId == req.params.id) {

                    Tours.remove({

                        id: req.params.id,
                        owner: user._id

                    }, function(err, tour) {

                        if (err) return res.status(500).send(err.message);

                        user.apps.splice(i,1);

                        user.save(function(err, user) {
                            if (err) return res.status(500).send(err.message);
                            res.status(200).jsonp(user.apps);
                        });

                    });


                    return;
                }
            }

            res.status(404).send('not found');

        });

    } else {
        res.status(403).send('forbiden');
    }

};

function updateApp(apps, app) {

    for (var i = 0; i < apps.length; i++) {

        if (apps[i].appId == app.appId) {
            apps[i] = app;
            return;
        }

    }

    apps.push(app);

}
