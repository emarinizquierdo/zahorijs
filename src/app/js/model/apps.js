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
    this.get = _get;
    this.add = _add;
    this.remove = _remove;


    /* Private Methods */
    function _get(p_callback) {
        superagent.get(properties.services.apps).end(function(err, res) {

            if (res && res.body) {
                that.apps = res.body;
            }

            riot.update();
            if(typeof p_callback == 'function'){
              p_callback();
            }
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

            riot.update();
            if(typeof p_callback == 'function'){
              p_callback();
            }

        });

    }

    function _remove(_appId, p_callback) {

        superagent.delete(properties.services.apps + "/" + _appId).end(function(err, res) {

            if (res && res.body) {
                that.apps = res.body;
            }

            riot.update();
            if(typeof p_callback == 'function'){
              p_callback();
            }

        });

    }

    return this;

}

export default new Apps();
