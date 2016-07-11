//File: controllers/steps.js
var mongoose = require('mongoose');
var Tours = mongoose.model('Tours');

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

    Tours.findOne({ apiKey: req.params.apikey, id: req.params.id }, function(err, tour) {
        if (err) return res.send(500, err.message);

        console.log('GET /tours/' + req.params.apikey);
        console.log('GET /tours/' + req.params.id);
        res.status(200).jsonp(tour);
    });

};

//POST - Insert a new Tours in the DB
exports.addTours = function(req, res) {

    console.log('POST');
    console.log(req.body);

    if (req.body._id) {

        Tours.findById(req.body._id, function(err, tour) {

            tour.apiKey = req.body.apiKey;
            tour.id = req.body.id;
            tour.name = req.body.name;
            tour.steps = req.body.steps;
            tour.published = req.body.published;

            tour.save(function(err, tour) {
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(tour);
            });
        });

    } else {

        var tour = new Tours({
            apiKey: req.body.apiKey,
            id: req.body.id,
            name: req.body.name,
            steps: req.body.steps,
            published: req.body.published
        });

        tour.save(function(err, tour) {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(tour);
        });
    }

};
