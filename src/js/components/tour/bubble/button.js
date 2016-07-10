import BasicButton from './basicButton';

export default Button;

	function Button(p_parentWrapper) {

        /*
            Inheritance
         */
        BasicButton.call(this, p_parentWrapper);

        /*
            Public Methods
         */
        this.focusMe = focusMe;

        /*
            Private Methods
         */

        function build(p_parentWrapper) {

            this.generalWrapper.className = "uts-button";
            p_parentWrapper.appendChild(this.generalWrapper);

        }

        function focusMe() {
            this.generalWrapper.focus();
        }

        build.call(this, p_parentWrapper);

    }

    Button.prototype = Object.create(BasicButton.prototype);
    Button.prototype.constructor = Button;