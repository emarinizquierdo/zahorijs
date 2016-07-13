import BasicButton from './basicButton';

export default CloseIcon;

	function CloseIcon(p_parentWrapper) {

        /*
            Inheritance
         */
        BasicButton.call(this, p_parentWrapper);

        /*
            Private Methods
         */
        function build(p_parentWrapper) {
            this.generalWrapper.className = "uts-close-icon";
            p_parentWrapper.appendChild(this.generalWrapper);
        }

        build.call(this, p_parentWrapper);

    }

    CloseIcon.prototype = Object.create(BasicButton.prototype);
    CloseIcon.prototype.constructor = CloseIcon;
