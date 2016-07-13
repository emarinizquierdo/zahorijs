import Button from '../bubble/button';
import dictionary from './dictionary';

export default globalCloseButton;

    function globalCloseButton(properties, lang) {

        var GLOBAL_CLOSE_BUTTON_CLASS = "uts-global-close-button";

        function GlobalCloseButton(p_parentWrapper) {

            /* Inheritance */
            Button.call(this, p_parentWrapper);

            /* Revealing Methods */
            this.toBottom = toBottom.bind(this);
            this.toTop = toTop.bind(this);

            /* Initialize object */
            build.call(this, p_parentWrapper);

        }

        function build(p_parentWrapper) {

            lang.addDictionary(dictionary);
            this.literal = new lang.Literal();
            this.literal.setText('CLOSE');

            /* Wrapper elements styles */
            this.generalWrapper.className = GLOBAL_CLOSE_BUTTON_CLASS;
            this.generalWrapper.appendChild(this.literal.element);

            /* Configuration */
            //lang.setMultiLangText(this.generalWrapper, 'Cerrar ayuda');

            p_parentWrapper.appendChild(this.generalWrapper);

        }

        /**
         * Method to send the global close button to the bottom of the screen
         * @param  {boolean} pByTooltip If true, it is set by tooltip, else, it is
         * set by helperlayer
         * @return {NA}            NA
         */
        function toBottom(pByTooltip) {

            if (pByTooltip) {
                this.generalWrapper.className = this.generalWrapper.className.replace(/ uts-global-close-button-tooltip-bottom/g, "");
                this.addClass('uts-global-close-button-tooltip-bottom');
            } else {
                this.generalWrapper.className = this.generalWrapper.className.replace(/ uts-global-close-button-helperlayer-bottom/g, "");
                this.addClass('uts-global-close-button-helperlayer-bottom');
            }

            if (properties.isInHPD) {
                this.generalWrapper.style.top = (properties.screen.height - 50) + "px";
                this.generalWrapper.style.bottom = "initial";
            }

        }

        /**
         * Method to send the global close button to the top of the screen
         * @param  {boolean} pByTooltip If true, it is set by tooltip, else, it is
         * set by helperlayer
         * @return {NA}            NA
         */
        function toTop(pByTooltip) {

            if (properties.isInHPD) {
                this.generalWrapper.style.top = (properties.screen.scrollTop - ( properties.screen.fixedHead - properties.screen.overHead ) + 8) + "px";
                this.generalWrapper.style.bottom = "initial";
            }

            if (pByTooltip) {
                this.generalWrapper.className = this.generalWrapper.className.replace(/ uts-global-close-button-tooltip-bottom/g, "");
            } else {
                this.generalWrapper.className = this.generalWrapper.className.replace(/ uts-global-close-button-helperlayer-bottom/g, "");
            }



        }

        return GlobalCloseButton;

    }