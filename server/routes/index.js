var UserCtrl = require('../controllers/users'),
    AppsCtrl = require('../controllers/apps'),
    StepsCtrl = require('../controllers/steps'),
    ToursCtrl = require('../controllers/tours'),
    SubscriptionsCtrl = require('../controllers/subscriptions'),
    BraintreeCtrl = require('../controllers/braintree'),
    superagent = require('superagent'),
    passport = require('passport'),
    braintree = require('braintree');

var TRANSACTION_SUCCESS_STATUSES = [
    braintree.Transaction.Status.Authorizing,
    braintree.Transaction.Status.Authorized,
    braintree.Transaction.Status.Settled,
    braintree.Transaction.Status.Settling,
    braintree.Transaction.Status.SettlementConfirmed,
    braintree.Transaction.Status.SettlementPending,
    braintree.Transaction.Status.SubmittedForSettlement
];

module.exports = function(router) {

    var _base = '/api';

    /* User REST */

    router.get(_base + '/users', isSuperUser, UserCtrl.findAllUsers);

    router.put(_base + '/user', authRequired, UserCtrl.updateUser);

    router.route(_base + '/user/:email', authRequired, UserCtrl.findById);

    router.get(_base + '/me', UserCtrl.me);

    /* Subscription REST */

    router.get(_base + '/subscriptions', authRequired, SubscriptionsCtrl.get);

    router.put(_base + '/subscriptions/cancel', authRequired, SubscriptionsCtrl.cancel);

    /* Braintree REST */
    router.get(_base + '/braintree/token', BraintreeCtrl.token);

    router.post(_base + '/braintree/billing', BraintreeCtrl.billing);

    /* Apps REST */

    router.route(_base + '/apps')
        .get(AppsCtrl.findAllApps)
        .put(AppsCtrl.updateApps);

    router.delete(_base + '/apps/:id', authRequired, AppsCtrl.removeApp);

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
                req.user = {
                    email: email
                };
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

function isSuperUser(req, res, next) {
    console.log(req.user);
    if (req.user && (req.user.role == 'superadmin')) {
        next();
        return;
    } else {
        return res.status(403).send('forbiden');
    }

}
