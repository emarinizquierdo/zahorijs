import configuration from './configuration';
import lang from './services/lang';
import tours from './services/tours';
import tour from './components/tour/tour';

export default Core;

    /**
     * Main Usertour Class
     */
    function Core() {


        /* Get Constructor */
        var Lang = lang(configuration.effectiveProperties),
            Tour = tour(configuration.effectiveProperties, Lang);

        /* Private Variables */

        /* Public Variables */
        this.tour = new Tour();
        this.lang = Lang

        /* Revealing Methods */
        this.init = init.bind(this);
        this.restart = restart.bind(this);
        this.configure = configure.bind(this);

    }

    /**
     * Method that starts tour loading and, if there is a non readed
     * tour, it runs tour component.
     * @return {NA} NA
     */
    function init(options) {

      configuration.effectiveProperties.apiKey = options.apiKey;
      configuration.effectiveProperties.appId = options.appId;
      //We have to retrieve only no-readed tours to show the tour in the app
      tours(configuration.effectiveProperties).get(function(err, data) {

          onGet.call(this, data.body);

      }.bind(this));

    }


    /**
     * Method that restart a tour bringing from back a tour.
     * This method brings even a readed tour.
     * @return {NA} NA
     */
    function restart() {

        tours(configuration.effectiveProperties).get(function(err, data) {

            this.tour.stop();
            onGet.call(this, data, true);

        }.bind(this), true);

    }

    /**
     * Method that starts and marks as readed a tour
     * @param  {object} pData tour from back object
     * @param {boolean} forcedByUser indicates if the tour is being initialized by user
     * @return {NA}       NA
     */
    function onGet(pData, forcedByUser) {

        window.focus();

        if (pData && pData.steps) {

            this.tour.start(pData.steps);

        }


    }

    /**
     * Method that marks as readed a tour
     * @param  {integer} pTourID tour ID
     * @return {NA}         NA
     */
    function readTour(pTourID) {
        tours(configuration.effectiveProperties).read(pTourID, function(err, data) {

        }.bind(this));
    }

    function configure(pOptions) {
        configuration.set(pOptions);
    }

    /**
     * Method that show HPD Help button
     */
    function setHPDHelp() {

        restart.call(this);

    }
