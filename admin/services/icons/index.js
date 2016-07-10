(function() {
    'use strict'

    var request = require('superagent');
    var properties = require('../../properties').properties;
    var utils = require('../../services/utils');

    exports.get = function(callback) {

        request.get(properties.url[utils.environment().env].icons)
            .end(callback);

    }

})();
