var braintree = require("braintree");
var config = require('../config.json');

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   config['MERCHANT_SANDBOX_ID'],
    publicKey:    config['PUBLIC_SANDBOX_KEY'],
    privateKey:   config['PRIVATE_SANDBOX_KEY']
});

module.exports = gateway;
