var StepsCtrl = require('../controllers/steps'),
	ToursCtrl = require('../controllers/tours');

module.exports = function(router) {

    router.get('/', function(req, res) {
        res.send("Hello World!");
    });

    /* Steps REST*/

    router.route('/steps')
        .get(StepsCtrl.findAllSteps)
        .post(StepsCtrl.addStep);

    router.route('/steps/multiple')
        .post(StepsCtrl.addMultipleSteps);

    router.route('/steps/:id')
        .get(StepsCtrl.findById);

    /* Tour REST */
    router.route('/tours/:apikey/:app')
        .get(ToursCtrl.findAllTours)
        .post(ToursCtrl.addTours);

    return router;

}
