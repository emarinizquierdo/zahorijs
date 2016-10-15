'use strict'

import superagent from 'superagent';
import properties from '../properties';

function Users() {

    /* Bind this to that */
    var that = this;

    /* Doing observable */
    riot.observable(this)

    /* Private vars */

    /* Public vars */
    this.users = null;
    this.me = null;
    that.isUserLogged = false;

    /* Revealing Methods */
    this.getUsers = _getUsers;
    this.getMe = _getMe;
    this.updateMe = _updateMe;
    this.logout = _logout;

    /* Private Methods */


    function _getUsers(p_callback) {

        superagent.get(properties.services.users).end(function(err, res) {

            if (res && res.body) {
                that.users = res.body;
            }

            riot.update();

            if(typeof p_callback == 'function'){
              p_callback(err, res);
            }

        });

    }

    function _getMe(p_callback) {

        superagent.get(properties.services.me).end(function(err, res) {

            if (err && (err.status == 403)) {
                that.isUserLogged = false;
            }

            if (res && res.body) {
                that.me = res.body;
                that.isUserLogged = true;
            }

            riot.update();
            if(typeof p_callback == 'function'){
              p_callback(err, res);
            }

        });

    }

    function _updateMe( p_callback ){

      superagent.put(properties.services.user).send({apiKey: users.me.apiKey}).end(function (err, res) {

          // Calling the end function will send the request
          if (res && res.body) {
              that.me = res.body;
          }

          riot.update();
          if(typeof p_callback == 'function'){
            p_callback(err, res);
          }

      });

    }

    function _logout() {

        that.isUserLogged = false;

    }

    return this;

}

export default new Users();
