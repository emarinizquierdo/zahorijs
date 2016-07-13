
import Screen from '../../services/screen';

export default steps;

 function steps(properties) {

        /* Get Constructors */
        var screen = Screen(properties);

        var AVAILABLE_ELEMENT_TIMEOUT = 10000;

        /**
         * Class that provides basic methods to navigate across
         * the diferent steps of the user tour
         * @param {Array} journey Raw Journey Array
         */
        function Steps(journey) {

            /* Public Variables */
            this.pointer = -1; //We init the pointer out of the logic range
            this.steps = journey || [];
            this.availableElementTimeout;

            /* Revealing Methods */
            this.total = total.bind(this);
            this.getPointer = getPointer.bind(this);
            this.next = next.bind(this);
            this.getNextAccessible = getNextAccessible.bind(this);
            this.startElementSearch = startElementSearch.bind(this);
            this.stopElementSearch = stopElementSearch.bind(this);
            this.previous = previous.bind(this);
            this.goTo = goTo.bind(this);
            this.stepsLeft = stepsLeft.bind(this);

        }

        /**
         * Method that returns the pointer
         * @return {[type]} [description]
         */
        function getPointer() {
            return this.pointer;
        }

        /**
         * Method that returns total steps
         * @return {integer} total steps
         */
        function total() {
            return this.steps.length;
        }

        /**
         * Method that tell us if there are more steps
         * 'at right' of the pointer
         * @return {boolean} Returns true if there are steps available
         */
        function stepsLeft() {
            return (this.pointer < this.steps.length - 1);
        }

        /**
         * Method that returns the current step
         * @return {object} The current step object
         */
        function getCurrentStep() {
            return (this.steps && this.steps[this.pointer]) ? this.steps[this.pointer] : null;
        }

        /**
         * Function that returns the next step
         * @return {object} The next step object
         */
        function next() {

            if (this.pointer + 1 < this.steps.length) {
                ++this.pointer;
                return getCurrentStep.call(this);
            }

            return null;
        }

        /**
         * Function that returns the previous step
         * @return {object} The previous step object
         */
        function previous() {

            if (this.pointer > 0) {
                --this.pointer;
                return getCurrentStep.call(this);
            }

            return null;
        }

        function getNextAccessible() {

            for (var i = this.getPointer() + 1; i < this.steps.length; i++) {
                if (screen.isAccessible(document.querySelector(this.steps[i].selector), true)) {
                    return i;
                }
            }

            return -1;

        }

        /**
         * Function that returns the previous step
         * @return {object} The previous step object
         */
        function goTo(pointer) {

            if ((0 <= pointer) && (pointer < this.steps.length)) {
                this.pointer = pointer;
                return getCurrentStep.call(this);
            }

            return null;
        }

        /**
         * Method that starts an element available timeout. If this
         * timeout expires, the method return the nearest available step pointer
         * and execute the callback
         * @param  {function} pCallback Callback function
         * @return {NA}           NA
         */
        function startElementSearch(pCallback) {

            console.log('star element search');
            clearTimeout(this.availableElementTimeout);

            this.availableElementTimeout = setTimeout(function() {

                if (typeof pCallback == "function") {
                    pCallback(getNextAccessible.call(this));
                }

            }.bind(this), AVAILABLE_ELEMENT_TIMEOUT);

        }

        /**
         * Method that clear the timeout initialized when user goes to another step.
         * @return {[type]} [description]
         */
        function stopElementSearch() {

            console.log('stopping element search');
            if (this.availableElementTimeout) {
                clearTimeout(this.availableElementTimeout);
                this.availableElementTimeout = null;
            }

        }


        return Steps;

    }
