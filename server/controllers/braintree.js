//File: controllers/steps.js
var gateway = require('../gateway');
var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Tours = mongoose.model('Tours');
var Subscriptions = mongoose.model('Subscriptions');

//GET - Return all Steps in the DB
exports.token = function(req, res) {


    gateway.clientToken.generate({}, function(err, response) {
        res.status(200).jsonp({
            clientToken: response.clientToken
        });
    });

};

//POST - Return a Step with specified ID
exports.billing = function(req, res) {

    var nonce = req.body.payment_method_nonce;
console.log(nonce);

    if (req.user && req.user.email) {

        Users.findOne({
            email: req.user.email
        }, function(err, user) {

            if (err) return res.send(500, err.message);

            gateway.customer.find(user.customerId, function(err, result) {

                if (err) return res.send(500, err.message);
                console.log(result);

                if (result.paymentMethods[0]) {
                  var token = result.paymentMethods[0].token;

                  _createSubscription(user, req, res, token);
                } else {

                    gateway.paymentMethod.create({
                        customerId: user.customerId,
                        paymentMethodNonce: nonce
                    }, function(err, result) {

                        var token = result.paymentMethod.token;
                        _createSubscription(user, req, res, token);
                    });
                }




            });


        });

    } else {
        res.status(403).send('forbiden');
    }

};


function _createSubscription(user, req, res, token){

  gateway.subscription.create({

      paymentMethodToken: token,
      planId: 'm97r'

  }, function(err, result) {

      if (result.success && result.subscription) {

          var _subscription = new Subscriptions({
              email: req.user.email,
              planType: 'm97r',
              subscriptionId: result.subscription.id
          });

          _subscription.save(function(err, subscription) {
              if (err) return res.status(500).send(err.message);

              for (var i = 0; i < user.apps.length; i++) {

                  user.apps[i].active = false;

                  if (i < 10) {
                      user.apps[i].active = true;
                  }

              }

              console.log('userid...' + user._id);
              Tours.update({
                      owner: user._id
                  }, {
                      active: true
                  }, {
                      multi: true
                  },
                  function(err, result) {

                      console.log(result);
                      if (err) return res.status(500).send(err.message);

                      user.markModified('apps');
                      user.save(function(err, user) {

                          if (err) return res.status(500).send(err.message);
                          console.log(user);
                          res.status(200).jsonp(subscription);

                      });

                  });
          });


      } else {
          res.status(500).send(err.message);
      }

  });

}
