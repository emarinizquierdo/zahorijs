(function() {
    'use strict'

    var _connector = '/api';

    exports.properties = {

        url: {

            localhost: {
                icons: _connector + "/icons/bubble",
                tour: "http://localhost:8080" + _connector + "/tours",
            },
            dev: {
                icons: _connector + "/icons/bubble",
                tour: _connector + "/tours",
            },
            au: {
                icons: _connector + "/icons/bubble",
                tour: _connector + "/tours",
            },
            pro: {
                icons: _connector + "/icons/bubble",
                tour: "http://localhost:8080" + _connector + "/tours",
            }

        }

    }

})();
