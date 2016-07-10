import properties from './properties';
import {environment} from './utils';

export default new Configuration( properties );

    function Configuration( properties ) {

        /* Public Variables */
        this.effectiveProperties = properties;
        this.effectiveProperties.environment = environment().env; //[dev|au|pro]
        this.effectiveProperties.isInHPD = false; //[dev|au|pro]
        this.effectiveProperties.screen = {};

        /* Revealing Methods */
        this.set = set.bind(this);
        this.inHPD = inHPD.bind(this);

        /* Constructor */
        //__init__.call(this);

    }

    function __init__(){

      if(typeof bbva != 'undefined' && bbva.front){

        bbva.front.global.Invoke("GetScreenInfo", function(data){
          this.effectiveProperties.screen = data;
        }.bind(this));

        bbva.front.util.crossframe.Subscribe("OnScroll",function(data){
            this.effectiveProperties.screen = data;
        }.bind(this));

        bbva.front.util.crossframe.Subscribe("OnResize",function(data){
            this.effectiveProperties.screen = data;
        }.bind(this));
      }

    }

    /**
     * Method that set configuration by user
     * @param {NA} pOptions NA
     */
    function set(pOptions) {

        if (pOptions) {
            this.effectiveProperties.atom = pOptions.atom || this.effectiveProperties.atom;
            this.effectiveProperties.app = pOptions.app;
            this.effectiveProperties.connector.local = (pOptions.connector && pOptions.connector.local) ? pOptions.connector.local : this.effectiveProperties.connector.local;
            this.effectiveProperties.connector.dev = (pOptions.connector && pOptions.connector.dev) ? pOptions.connector.dev : this.effectiveProperties.connector.dev;
            this.effectiveProperties.connector.au = (pOptions.connector && pOptions.connector.au) ? pOptions.connector.au : this.effectiveProperties.connector.au;
            this.effectiveProperties.connector.pro = (pOptions.connector && pOptions.connector.pro) ? pOptions.connector.pro : this.effectiveProperties.connector.pro;
            this.effectiveProperties.header = (pOptions.header) || 0;
        }

    }

    /**
     * Method that set isInHPD variable to true if app is inside HPD
     * @param  {function} pCallback callback function
     * @return {NA}           NA
     */
    function inHPD(pCallback) {

        if (typeof bbva != 'undefined' && bbva.front) {

            bbva.front.util.crossframe.RequestMessage("bbva.front.info", top, "*", function(data) {

                this.effectiveProperties.isInHPD = (data.data == "GHPD");
                pCallback.call(this);

            }.bind(this));

        } else {
            pCallback.call(this);
        }

    }