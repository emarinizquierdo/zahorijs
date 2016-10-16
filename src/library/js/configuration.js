import properties from './properties';
import {environment} from './utils';

export default new Configuration( properties );

    function Configuration( properties ) {

        /* Public Variables */
        this.effectiveProperties = properties;
        this.effectiveProperties.environment = environment().env; //[dev|au|pro]
        this.effectiveProperties.screen = {};

        /* Revealing Methods */
        this.set = set.bind(this);

        /* Constructor */
        //__init__.call(this);

    }

    function __init__(){


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
