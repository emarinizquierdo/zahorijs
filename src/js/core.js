import configuration from './configuration';
import lang from './services/lang';
import tours from './services/tours';
import tour from './components/tour/tour';

export default Core;

    var GUIDED_TOUR_SET_TOUR = "setUserTour",
        GUIDED_TOUR_HELP_MESSAGE = "bbva.front.launchUserTour";


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
    function init() {

        configuration.inHPD(function() {

            //We have to retrieve all published readed and no-readed tours to
            //set action button in HPD
            tours(configuration.effectiveProperties).get(function(err, data) {

                //Show only HPD action button if there are tours
                if(data && data.body && data.body.data && data.body.data.list && ( data.body.data.list.length > 0 )){
                    setHPDHelp.call(this);
                }

            }.bind(this), true);

            //We have to retrieve only no-readed tours to show the tour in the app
            tours(configuration.effectiveProperties).get(function(err, data) {

                onGet.call(this, data);

            }.bind(this));

        }.bind(this));

    }

    /**
     * Method that restart a tour bringing from back a tour.
     * This method brings even a readed tour.
     * @return {NA} NA
     */
    function restart() {

        //tours(configuration.effectiveProperties).get(function(err, data) {

            var data = {};
            data.steps = [{"title":{"es_ES":"primer paso","en_US":"primer paso"},"intro":{"es_ES":"","en_US":""},"doClick":false,"typewrite":false,"typewriteValue":"","icon":{},"enableCustomButton":false,"customButton":{"es_ES":"","en_US":""},"urlCustomButton":"","selector":"body:nth-child(2) > section:nth-child(1) > header:nth-child(1) > input:nth-child(2)","id":"1468151946485"},{"title":{"es_ES":"segundo paso","en_US":"segundo paso"},"intro":{"es_ES":"","en_US":""},"doClick":false,"typewrite":false,"typewriteValue":"","icon":{},"enableCustomButton":false,"customButton":{"es_ES":"","en_US":""},"urlCustomButton":"","selector":"body:nth-child(2) > footer:nth-child(2)","id":"1468151955112"},{"title":{"es_ES":"tercer paso","en_US":"tercer paso"},"intro":{"es_ES":"","en_US":""},"doClick":false,"typewrite":false,"typewriteValue":"","icon":{},"enableCustomButton":false,"customButton":{"es_ES":"","en_US":""},"urlCustomButton":"","selector":"body:nth-child(2) > section:nth-child(1) > header:nth-child(1) > h1:nth-child(1)","id":"1468151964854"}];
            this.tour.stop();
            onGet.call(this, data, true);

        //}.bind(this), true);

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