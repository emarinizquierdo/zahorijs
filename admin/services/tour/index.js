(function() {
    'use strict'

    var request = require('superagent');
    var properties = require('../../properties').properties;
    var utils = require('../../services/utils');

    exports.get = function(pOptions, callback) {

        var params = {
            showall: true
        };

        var url = properties.url[utils.environment().env].tour + "/" + pOptions.apiKey + "/" + pOptions.id;

        request.get(url)
        .set('token', TOKENOAUTH)
        .end(callback);

    };

    exports.save = function(pTour, callback) {

        request.post(properties.url[utils.environment().env].tour)
            .send(pTour)
            .set('token', TOKENOAUTH)
            .end(callback);

    }

})();
