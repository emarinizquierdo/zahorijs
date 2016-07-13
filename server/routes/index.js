var UserCtrl = require('../controllers/users'),
    StepsCtrl = require('../controllers/steps'),
    ToursCtrl = require('../controllers/tours'),
    passport = require('passport');

module.exports = function(router) {

    router.get('/', function(req, res) {
        res.send("Hello World!");
    });

    /* User REST */

    router.route('/user')
        .post(UserCtrl.addUser);

    router.route('/user/:email')
        .get(UserCtrl.findById);

    /* Steps REST*/

    router.route('/steps')
        .get(StepsCtrl.findAllSteps)
        .post(StepsCtrl.addStep);

    router.route('/steps/multiple')
        .post(StepsCtrl.addMultipleSteps);

    router.route('/steps/:id')
        .get(StepsCtrl.findById);

    /* Tour REST */

    router.route('/tours')
        .post(ToursCtrl.addTours);

    router.route('/tours/:apikey/:id')
        .get(ToursCtrl.findById);

    return router;

}
