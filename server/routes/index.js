var UserCtrl = require('../controllers/users'),
    AppsCtrl = require('../controllers/apps'),
    StepsCtrl = require('../controllers/steps'),
    ToursCtrl = require('../controllers/tours'),
    superagent = require('superagent'),
    passport = require('passport');

module.exports = function(router) {

    var _base = '/api';

    /* User REST */

    router.put(_base + '/user', authRequired, UserCtrl.updateUser);

    router.route(_base + '/user/:email', authRequired, UserCtrl.findById);

    router.get(_base + '/me', UserCtrl.me);

    /* Apps REST */

    router.route(_base + '/apps')
        .get(AppsCtrl.findAllApps)
        .put(AppsCtrl.updateApps);


    /* Steps REST*/

    router.route(_base + '/steps')
        .get(StepsCtrl.findAllSteps)
        .post(StepsCtrl.addStep);

    router.post(_base + '/steps/multiple', authRequired, StepsCtrl.addMultipleSteps);

    router.get(_base + '/steps/:id', StepsCtrl.findById);

    /* Tour REST */

    router.post(_base + '/tours', authRequired, ToursCtrl.addTours);

    router.route(_base + '/tours/:apikey/:id')
        .get(ToursCtrl.findById);

    router.get('/auth/logout', function(req, res) {
        req.logout();
        res.redirect('/'); //Can fire before session is destroyed?
    });

    return router;

}

function checkToken(token, callback) {
    console.log('el token es....' + token);
    superagent.get('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token)
        .end(function(err, res) {

            if (res && res.body && res.body.email) {
                callback(res.body.email);
            } else {
                callback();
            }

        });

}


// Middleware that requires the user to be logged in. If the user is not logged
// in, it will redirect the user to authorize the application and then return
// them to the original URL they requested.
function authRequired(req, res, next) {

    if (req && req.headers && req.headers.token) {
        checkToken(req.headers.token, function(email) {

            if (email) {
                req.user = {email : email};
                next();
                return;
            } else {
                return res.status(403).send('forbiden');
            }

        });

    } else {

        if (req.user) {
            next();
            return;
        } else {
            req.session.oauth2return = req.originalUrl;
            return res.redirect('/auth/login');
        }
        next();
        
    }

}
