//File: controllers/steps.js
var mongoose = require('mongoose');
var Tours = mongoose.model('Tours');
var Users = mongoose.model('Users');

//GET - Return all Steps in the DB
exports.findAllTours = function(req, res) {

    Tours.find(function(err, tours) {

        if (err) res.send(500, err.message);

        console.log('GET /tours')
        res.status(200).jsonp(tours);

    });

};

//GET - Return a Tours with specified ID
exports.findById = function(req, res) {


    Tours.findOne({

        apiKey: req.params.apikey,
        id: req.params.id

    }, function(err, tour) {
        if (err) return res.send(500, err.message);

        console.log('GET /tours/' + req.params.apikey);
        console.log('GET /tours/' + req.params.id);
        res.status(200).jsonp(tour);
    });

};

//POST - Insert a new Tours in the DB
exports.addTours = function(req, res) {

    console.log('POST');
    console.log(req);

    if (req && req.user) {

        Users.findOne({
            email: req.user.email
        }, function(err, user) {

            if (err) return res.status(500).send(err.message);
            console.log("el user es: " + user);
            console.log('el api key es: ' + user.apiKey + " y el otro es " + req.body.apiKey);

            if (user.apiKey == req.body.apiKey) {

                for (var i = 0; i < user.apps.length; i++) {
                    console.log('el appid es: ' + user.apps[i].appId + " y el otro es " + req.body.id);
                    if (user.apps[i].appId == req.body.id) {

                        if (req.body._id) {
                          console.log("aqui entra");
                            Tours.findById(req.body._id, function(err, tour) {

                                tour.apiKey = req.body.apiKey;
                                tour.id = req.body.id;
                                tour.name = req.body.name;
                                tour.steps = req.body.steps;
                                tour.published = req.body.published;

                                tour.save(function(err, tour) {
                                    if (err) return res.status(500).send(err.message);
                                    return res.status(200).jsonp(tour);
                                });
                            });

                        } else {
                            console.log("aqui tambien entra");
                            var tour = new Tours({
                                apiKey: req.body.apiKey,
                                id: req.body.id,
                                name: req.body.name,
                                steps: req.body.steps,
                                published: req.body.published
                            });

                            tour.save(function(err, tour) {
                                if (err) return res.status(500).send(err.message);
                                return res.status(200).jsonp(tour);
                            });


                        }

                        return;
                    }
                }

            }

            res.status(404).send('not found');

        });

    } else {
        res.status(403).send('forbiden');
    }

};


function checkTourPermission() {

    Users.find({
        email: req.user.email
    }, function(err, user) {

        if (err) return res.status(500).send(err.message);

        user.apiKey;


    });

}
