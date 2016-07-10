export default Clicker;

    var CLICKER_CLASS = 'uts-clicker',
        CLICKER_CLICKED_CLASS = 'uts-bubble-text-wrapper',
        BUBBLE_TEXT_CLASS = 'uts-bubble-text',
        CALLBACK_DELAY = 500;

    function Clicker( parentWrapper ) {

        /*Private Variables */
        this._parentWrapper = parentWrapper;
        this._generalWrapper;

        /* Revealing Methods */
        this.click = click.bind(this);

        /* Initialize object */
        build.call(this);
    }

    /**
     * Constructor of the class
     * @return {NA} NA
     */
    function build() {

        /* Wrapper elements creation */
        this._generalWrapper = document.createElement('span');

        /* Wrapper elements styles */
        this._generalWrapper.className = CLICKER_CLASS;

        this._parentWrapper.appendChild(this._generalWrapper);

    }

    /**
     * Method that simulate the click effect on the screen
     * @param  {Function} pCallback Function called after click effect
     * @return {NA}          NA
     */
    function click(pCallback) {

        /* We add the class that trigger click effect*/
        this._generalWrapper.className += " uts-clicker--click";

        /* After a timeout, we remove class and call the callback function */
        setTimeout(function() {

            this._generalWrapper.className = this._generalWrapper.className.replace(" uts-clicker--click", "");

            if (typeof pCallback == "function") {
                pCallback();
            }

        }.bind(this), CALLBACK_DELAY);


    }