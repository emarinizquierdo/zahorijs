import BasicButton from '../basicButton';

export default Arrow;

	    function Arrow(p_parentWrapper) {

        /*
            Inheritance
         */
        BasicButton.call(this, p_parentWrapper);

        /*
            Private Methods
         */
        function build(p_parentWrapper) {

            var arrowIcon;

            this.generalWrapper.className = "round-button-circle";
            arrowIcon = document.createElement('span');
            this.generalWrapper.appendChild(arrowIcon);
            p_parentWrapper.appendChild(this.generalWrapper);

        }


        build.call(this, p_parentWrapper);

    }

    Arrow.prototype = Object.create(BasicButton.prototype);
    Arrow.prototype.constructor = Arrow;