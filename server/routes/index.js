var UserCtrl = require('../controllers/users'),
    StepsCtrl = require('../controllers/steps'),
    ToursCtrl = require('../controllers/tours'),
    passport = require('passport');

module.exports = function(router) {

	var _base = '/api';

    router.get(_base + '/', function(req, res) {
        res.send("Hello World!");
    });

    /* User REST */

    router.route(_base + '/user')
        .post(UserCtrl.addUser);

    router.route(_base + '/user/:email')
        .get(UserCtrl.findById);

    /* Steps REST*/

    router.route(_base + '/steps')
        .get(StepsCtrl.findAllSteps)
        .post(StepsCtrl.addStep);

    router.route(_base + '/steps/multiple')
        .post(StepsCtrl.addMultipleSteps);

    router.route(_base + '/steps/:id')
        .get(StepsCtrl.findById);

    /* Tour REST */

    router.route(_base + '/tours')
        .post(ToursCtrl.addTours);

    router.route(_base + '/tours/:apikey/:id')
        .get(ToursCtrl.findById);

    router.get('/auth/logout', function(req, res) {
        req.logout();
        res.redirect('/'); //Can fire before session is destroyed?
    });

    return router;

}
