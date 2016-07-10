(function() {
    'use strict'

    var request = require('superagent');
    var properties = require('../../properties').properties;
    var utils = require('../../services/utils');

    exports.get = function(pOptions, callback) {

        var params = {
            showall: true
        };

        if(pOptions && pOptions.appID){
          params.app = pOptions.appID;
        }

        var queryString = "?filters=" + encodeURIComponent(JSON.stringify(params));

        request.get(properties.url[utils.environment().env].tour + queryString)
            .end(callback);

    };

    exports.save = function(pTour, callback) {
debugger;
        request.post(properties.url[utils.environment().env].tour)
            .send(pTour)
            .end(callback);

    }

})();
