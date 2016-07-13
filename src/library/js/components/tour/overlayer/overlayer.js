import Clicker from './clicker';
import globalCloseButton from './globalCloseButton';
import spinner from './spinner';
import Screen from '../../../services/screen';

export default overlayer;

function overlayer(properties, lang) {

        /* Get constructors */
        var GlobalCloseButton = globalCloseButton(properties, lang),
            Spinner = spinner(lang),
            screen = Screen(properties);

        function Overlayer(pUserTour, pTargetElement) {

            /* Private Variables */
            this._userTour = pUserTour;
            this._closeButtonWrapper;
            this._spinnerWrapper;
            this._isMoving = false; //Variable to control when user is moving the bubble
            this._movingTimeout;

            /* Public Variables */
            this.wrapper;
            this.clicker;
            this.closeButton;
            this.spinner;
            this.targetElement = pTargetElement;

            /* Revealing Methods */
            this.move = move.bind(this);
            this.stopListener = stopListener.bind(this);
            this.pointTo = pointTo.bind(this);

            build.apply(this);
            this.move();

        }

        /* Private Methods */
        function build() {

            /* Wrapper elements creation */
            this.globalWrapper = document.createElement('div');
            this.wrapper = document.createElement('div');
            this._closeButtonWrapper = document.createElement('div');
            this._spinnerWrapper = document.createElement('div');

            /* Wrapper elements styles */
            this.globalWrapper.className = "uts-usertour";
            this.wrapper.id = 'uts-helperLayer';
            this.wrapper.className = 'uts-helperLayer';

            /* Add components */
            this.clicker = new Clicker(this.wrapper);
            this.closeButton = new GlobalCloseButton(this.wrapper);
            this.closeButton.show();
            this.spinner = new Spinner(this.wrapper);
            this.globalWrapper.appendChild(this.wrapper);

            //this.wrapper.appendChild(this._closeButtonWrapper);
            document.body.appendChild(this.globalWrapper);

        }

        /**
         * Function used to indicate bubble who is the target
         * @param  {DOM element} pTargetElement target element
         * @return {NA}                NA
         */
        function pointTo(pSelector) {

            /* Set _isMoving when user goto next step to control globalCloseButton  */
            this._isMoving = true;
            clearTimeout(this._movingTimeout);
            this._movingTimeout = setTimeout(function() {
                this._isMoving = false;
            }.bind(this), 500);

            this.targetSelector = pSelector;
            this.targetElement = document.querySelector(pSelector);
            this.move();
        }

        function move() {

            var _newtargetElement = document.querySelector(this.targetSelector);

            if (_newtargetElement && (this.targetElement != _newtargetElement)) {
                this.targetElement = _newtargetElement;
            }

            if (!screen.isAccessible(this.targetElement, true)) {

                this.wrapper.setAttribute('style', 'width: 0px; height: 0px; ');

            } else {

                if(this._userTour._bubble){
                  this._userTour._bubble.show();
                }

                this.spinner.hide();
                
                var elementPosition = screen.getOffset(this.targetElement),
                    widthHeightPadding = 0;

                if (this.targetElement.position == 'floating') {
                    widthHeightPadding = 0;
                }

                this.wrapper.setAttribute('style',
                    'width: ' + (elementPosition.width + widthHeightPadding) + 'px; ' +
                    'height:' + (elementPosition.height + widthHeightPadding) + 'px; ' +
                    'top:' + (elementPosition.top) + 'px;' +
                    'left: ' + (elementPosition.left) + 'px;'
                );

                if (!this._isMoving) {

                    var bounds = this.wrapper.getBoundingClientRect();

                    if ((bounds.right >= (window.innerWidth - 150)) && (bounds.top < 40)) {

                        this.closeButton.toBottom(true);

                    } else {

                        this.closeButton.toTop(false);

                    }

                }
            }

            document.removeEventListener('ut-tick', this.move, true);
            document.addEventListener('ut-tick', this.move, true);
        }

        function stopListener() {
            document.removeEventListener('ut-tick', this.move, true);
        }

        return Overlayer;

    }
