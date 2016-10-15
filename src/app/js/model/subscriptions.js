'use strict'

import superagent from 'superagent';
import properties from '../properties';
import apps from '../model/apps';

function Subscriptions() {

    /* Bind this to that */
    var that = this;

    /* Doing observable */
    riot.observable(this)

    /* Private vars */

    /* Public vars */
    this.data = null;
    this.token = null;

    /* Revealing Methods */
    this.get = _get;
    this.active = _active;
    this.cancel = _cancel;
    this.billing = _billing;

    /* Private Methods */


    function _get(p_callback) {

        superagent.get(properties.services.subscriptions).end(function(err, res) {

            if (res && res.body) {
                that.data = res.body;
            }

            riot.update();
            if(typeof p_callback == 'function'){
              p_callback(err, res);
            }


        });

    }

    function _active() {

        superagent.put(properties.services.subscriptions + '/active').end(function(err, res) {

            if (res && res.body) {
                that.data = res.body;
            }

        });

    }

    function _billing(nonce, p_callback) {

        superagent.post(properties.services.braintree + '/billing', {
            payment_method_nonce: nonce
        }).end(function(err, res) {

            if (res && res.body) {

            }

            riot.update();
            apps.get();
            if(typeof p_callback == 'function'){
              p_callback(err, res);
            }

        });


    }

    function _getToken() {

        superagent.get(properties.services.braintree + '/token').end(function(err, res) {

            if (res && res.body) {
                that.token = res.body.clientToken;
                that.trigger('token_ready');
            }

        });

    }

    function _cancel(p_callback) {

        superagent.put(properties.services.subscriptions + '/cancel').end(function(err, res) {

            that.data = null;

            riot.update();
            if(typeof p_callback == 'function'){
              p_callback();
            }

        });

    }

    _getToken();

    return this;

}

export default new Subscriptions();
