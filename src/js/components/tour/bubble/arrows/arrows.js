import BasicButton from '../basicButton';
import Arrow from './arrow';

export default Arrows;

    var KEYBOARD_DELAY = 500;

    function Arrows(p_parentWrapper, pOverlayer) {

        /* Private Variables */
        this._tooltipRightArrow;
        this._overlayer = pOverlayer;
        this._keyboardCtrl = false;
        this._keyboardHandler = keyboardHandler.bind(this);
        this._keyboardWait = false;

        /* Public Variables */
        this.generalWrapper = document.createElement('div');
        this.right;

        /* Public Methods */
        this.setKeyboardControl = setKeyboardControl.bind(this);

        /* Constructor */
        build.call(this, p_parentWrapper);

    }

    /* Private Methods */

    /**
     * Main constructor
     * @param  {DOM element} p_parentWrapper parent DOM element
     * @return {NA}                 NA
     */
    function build(p_parentWrapper) {

        this._tooltipRightArrow = document.createElement('div');

        this._tooltipRightArrow.className = 'uts-right-arrow';

        this.generalWrapper.className = "uts-arrows";
        this.generalWrapper.appendChild(this._tooltipRightArrow);

        this.right = new Arrow(this._tooltipRightArrow);

        p_parentWrapper.appendChild(this.generalWrapper);

    }

    /**
     * This method enable keyboard events
     * @param {boolean} pValue enable keyboardcontrol only when user tours are running
     */
    function setKeyboardControl(pValue) {

        if (pValue) {
            document.removeEventListener("keydown", this._keyboardHandler, true);
            document.addEventListener("keydown", this._keyboardHandler, true);
        } else {
            document.removeEventListener("keydown", this._keyboardHandler, true);
        }

    }

    /**
     * This method allows user navigate using right keyboard key
     * @param  {envent} event event object
     * @return {NA}       NA
     */
    function keyboardHandler(event) {

        var keyCode = event.which || event.keyCode;

        event.preventDefault();

        if (!this._overlayer._isMoving && !this._overlayer.spinner.showing && !this._keyboardWait && (keyCode == 39)) {
            this._keyboardWait = true;
            this.right.action();
            //We prevent repeatitive user keypress
            setTimeout(function() {
                this._keyboardWait = false;
            }.bind(this), KEYBOARD_DELAY);
        }
    }