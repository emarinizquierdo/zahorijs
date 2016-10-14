var braintree = require("braintree");
var config;

var _env = process.env.NODE_ENV || 'development';
console.log(_env);
if (_env == "production") {
    config = require('../config');
} else {
    config = require('../config.json');
}

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   config[_env].MERCHANT_SANDBOX_ID,
    publicKey:    config[_env].PUBLIC_SANDBOX_KEY,
    privateKey:   config[_env].PRIVATE_SANDBOX_KEY
});

module.exports = gateway;
