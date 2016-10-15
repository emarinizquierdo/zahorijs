'use strict'

import superagent from 'superagent';
import properties from '../properties';

function Apps() {

    /* Bind this to that */
    var that = this;

    /* Doing observable */
    riot.observable(this)

    /* Private vars */

    /* Public vars */
    this.apps = null;

    /* Revealing Methods */
    this.load = _load;
    this.add = _add;
    this.remove = _remove;


    /* Private Methods */
    function _load(p_callback) {
        superagent.get(properties.services.apps).end(function(err, res) {

            if (res && res.body) {
                that.apps = res.body;
            }

            p_callback();
        });

    }

    function _add(_appId, _appName, p_callback) {

        superagent.put(properties.services.apps).send({
            appId: _appId,
            appName: _appName
        }).end(function(err, res) {

            if (res && res.body) {
                that.apps = res.body;
            }

            p_callback();

        });

    }

    function _remove(_appId, p_callback) {

        superagent.delete(properties.services.apps + "/" + _appId).end(function(err, res) {

            if (res && res.body) {
                that.apps = res.body;
            }

            p_callback();

        });

    }

    return this;

}

export default new Apps();
