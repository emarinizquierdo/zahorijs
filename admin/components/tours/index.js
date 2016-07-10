(function(riot) {
    'use strict'

    var tour = require('../../services/tour');

    /**
     * Main Tour class
     */
    function Tours() {

        //Do this object observable to riotjs
        riot.observable(this);

        /* Public Variables */
        this.activeTour;
        this.isLoading = false;

        /* Revealing Methods */
        this.saveTour = saveTour.bind(this);
        this.saveSteps = saveSteps.bind(this);

        /* Event Handlers */
        this.on('load', load.bind(this));
    }

    /*Private Methods*/

    /**
     * Method that load tours from back services
     * @return {NA} NA
     */
    function load( pOptions ) {

        loading.call(this, true);

        tour.get(pOptions, function(err, data) {

            if (data) {
                this.activeTour = data.body.data.list[0];
                this.trigger('updateTours', this.activeTour.steps);
            }else{
                this.activeTour = null;
                this.trigger('updateTours', []);
            }

            loading.call(this, false);

        }.bind(this));

    }

    function loading(isLoading){
        this.isLoading = isLoading;
        this.trigger('updated');
    }

    /**
     * Method that save steps in a tour.
     * @param  {Array} pSteps     steps array
     * @param  {[type]} pOnsuccess [description]
     * @param  {[type]} pOnError   [description]
     * @return {[type]}            [description]
     */
    function saveSteps(pSteps, pOnsuccess, pOnError) {

        loading.call(this, true);
        this.activeTour.steps = pSteps;
        this.activeTour.stepIdList = [];

        for (var i = 0; i < this.activeTour.steps.length; i++) {
            this.activeTour.stepIdList[i] = this.activeTour.steps[i].id;
        }

        tour.save(this.activeTour, function(err, data) {

            loading.call(this, false);

        }.bind(this));

    }

    function saveTour(pOptions, pOnsuccess, pOnError) {

        loading.call(this, true);
        
        if(location.hostname.indexOf('localhost') < 0){

            var GAE_HOSTNAME_PATTERN = /(dev-|au-|)(bbva-)(([^.]+))?.appspot\.com/;
            var _hostnameParts = location.hostname.match(GAE_HOSTNAME_PATTERN);
            var _hostnameEnvironment = (_hostnameParts[1] == '-') ? '' : (_hostnameParts[1] == 'au-' ) ? 'au-' : 'dev-';
            var _hostnameApp = _hostnameParts[2] + _hostnameParts[3];
            this.activeTour.app = this.activeTour.app || pOptions.appID || _hostnameEnvironment + _hostnameApp;

        }else{

            this.activeTour.app = this.activeTour.app || pOptions.appID;

        }

        this.activeTour.steps = this.activeTour.steps || [];
        this.activeTour.stepIdList = this.activeTour.stepIdList || [];
        this.activeTour.published = false;

        for (var i = 0; i < this.activeTour.steps.length; i++) {
            this.activeTour.stepIdList[i] = this.activeTour.steps[i].id;
        }

        tour.save(this.activeTour, function(err, data) {

          if (data) {

              this.activeTour = data;
              this.trigger('updateTours', this.activeTour.steps);
              loading.call(this, false);

          }

        }.bind(this));

    }

    module.exports = Tours;

})(window.riot);
