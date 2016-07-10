import BasicButton from './basicButton';

export default Checkbox;

	    function Checkbox(p_parentWrapper) {

        /*
            Inheritance
         */
        BasicButton.call(this, p_parentWrapper);

        /*
            Private Variables
         */
        var checkboxBox,
            checkboxLabel;

        /*
            Public Methods
         */
        this.setText = setText;
        /*
            Private Methods
         */

        function build(p_parentWrapper) {

            checkboxBox = document.createElement("div");
            checkboxLabel = document.createElement("span");

            this.generalWrapper.className = "uts-checkbutton";
            checkboxBox.className = "uts-checkbutton-checkbox";
            this.generalWrapper.appendChild(checkboxBox);
            this.generalWrapper.appendChild(checkboxLabel);

            p_parentWrapper.appendChild(this.generalWrapper);

        }

        function setText(p_text) {
            checkboxLabel.innerHTML = $translate(p_text);
        }

        build.call(this, p_parentWrapper);

    }

    Checkbox.prototype = Object.create(BasicButton.prototype);
    Checkbox.prototype.constructor = Checkbox;