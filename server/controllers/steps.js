//File: controllers/steps.js
var mongoose = require('mongoose');
var Steps = mongoose.model('Steps');

//GET - Return all Steps in the DB
exports.findAllSteps = function(req, res) {

console.log(req.user);
    Steps.find(function(err, steps) {

        if (err) res.send(500, err.message);

        console.log('GET /steps')
        res.status(200).jsonp(steps);

    });

};

//GET - Return a Step with specified ID
exports.findById = function(req, res) {

    Steps.findById(req.params.id, function(err, step) {
        if (err) return res.send(500, err.message);

        console.log('GET /steps/' + req.params.id);
        res.status(200).jsonp(step);
    });

};

//POST - Insert a new TVShow in the DB
exports.addStep = function(req, res) {

    console.log('POST');
    console.log(req.body);

    var step = new Steps({
    	id: req.body.id,
        title: req.body.title,
    	intro: req.body.intro,
    	doClick: req.body.doClick,
    	typewrite: req.body.typewrite,
    	typewriteValue: req.body.typewriteValue,
	    icon: req.body.icon,
	    enableCustomButton: req.body.enableCustomButton,
    	customButton: req.body.customButton,
    	urlCustomButton: req.body.urlCustomButton,
    	selector: req.body.selector
    });

    step.save(function(err, step) {
        if(err) return res.status(500).send( err.message);
    res.status(200).jsonp(step);
    });
};

//POST - Insert a new TVShow in the DB
exports.addMultipleSteps = function(req, res) {

    console.log('POST');
    console.log(req.body);

	Steps.collection.insert(req.body.steps, function callback(err, insertedDocs) {
    // Here I use KrisKowal's Q (https://github.com/kriskowal/q) to return a promise,
    // so that the caller of this function can act upon its success or failure
    if (!err)
      res.status(200).jsonp(insertedDocs);
    else
      res.status(500).send( err.message);
  });
};
