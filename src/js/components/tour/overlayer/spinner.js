import SPINNER_DICTIONARY from './dictionary';

export default spinner;


function spinner(lang) {

        var SPINNER_WRAPPER_CLASS = "uts-spinner-wrapper",
            SPINNER_CIRCLES_WRAPPER_CLASS = "uts-spinner-circles-wrapper",
            SPINNER_BOUNCE1_CLASS = "uts-spinner-bounce1",
            SPINNER_BOUNCE2_CLASS = "uts-spinner-bounce2",
            MESSAGE_WRAPPER_CLASS = "uts-spinner-message-wrapper",
            MESSAGE_TIMEOUT = 2000;

        function Spinner(pParentWrapper) {

            this.generalWrapper;
            this.messageTimeout;
            this.showing = false;

            /* Revealing Methods */
            this.show = show.bind(this);
            this.hide = hide.bind(this);

            /* Call to constructor */
            build.call(this, pParentWrapper);
        }

        function build(p_parentWrapper) {

            lang.addDictionary(SPINNER_DICTIONARY);

            this.generalWrapper = document.createElement('div');
            this.spinnerCirclesWrapper = document.createElement('div');
            this.spinnerBounce1 = document.createElement('div');
            this.spinnerBounce2 = document.createElement('div');
            this.messageWrapper = document.createElement('div');
            this.literal = new lang.Literal();
            this.literal.setText('LOOKING_FOR');

            /* Wrapper elements styles */
            this.generalWrapper.className = SPINNER_WRAPPER_CLASS;
            this.spinnerCirclesWrapper.className = SPINNER_CIRCLES_WRAPPER_CLASS;
            this.spinnerBounce1.className = SPINNER_BOUNCE1_CLASS;
            this.spinnerBounce2.className = SPINNER_BOUNCE2_CLASS;
            this.messageWrapper.className = MESSAGE_WRAPPER_CLASS;

            this.messageWrapper.appendChild(this.literal.element);

            this.spinnerCirclesWrapper.appendChild(this.spinnerBounce1);
            this.spinnerCirclesWrapper.appendChild(this.spinnerBounce2);
            this.generalWrapper.appendChild(this.spinnerCirclesWrapper);
            this.generalWrapper.appendChild(this.messageWrapper);

            p_parentWrapper.appendChild(this.generalWrapper);

        }

        function show() {
            this.showing = true;
            this.generalWrapper.style.display = 'block';
            clearTimeout(this.messageTimeout);
            this.messageTimeout = setTimeout(showMessage.bind(this), MESSAGE_TIMEOUT);
        }

        function hide() {
            this.showing = false;
            clearTimeout(this.messageTimeout);
            hideMessage.call(this);
            this.generalWrapper.style.display = 'none';
        }

        function showMessage() {
            this.messageWrapper.style.opacity = 0.9;
        }

        function hideMessage() {
            this.messageWrapper.style.opacity = 0;
        }

        return Spinner;

    }
