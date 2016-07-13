import Checkbox from './checkbox';
import Bullets from './bullets';
import ProgressBar from './progressBar';
import CloseIcon from './closeButton';
import Arrows from './arrows/arrows';
import Button from './button';
import HorizontalLine from './horizontalLine';
import Screen from '../../../services/screen';

export default bubble;

function bubble(properties, lang) {

        /* Get Constructors */
        var screen = Screen(properties);

        /* Constants */
        var RIGHT_POSITION = 'right',
            LEFT_POSITION = 'left',
            MIDDLE_TOP_POSITION = 'middle-top',
            MIDDLE_BOTTOM_POSITION = 'middle-bottom',
            RIGHT_TOP_POSITION = 'right-top',
            LEFT_TOP_POSITION = 'left-top',
            FLOAT_POSITION = 'float',
            MIDDLE_SCREEN = 'middle-screen',
            BUBBLE_CLASS = 'uts-bubble',
            BUBBLE_TEXT_WRAPPER_CLASS = 'uts-bubble-text-wrapper',
            BUBBLE_TEXT_CLASS = 'uts-bubble-text',
            BUBBLE_TITLE_CLASS = 'uts-bubble-title',
            BUBBLE_ICON_CLASS = 'uts-bubble-icon',
            BUBBLE_TRIANGLE_CLASS = 'uts-triangle',
            BUBBLE_ARROWS_CLASS = 'uts-arrows-wrapper',
            BUBBLE_BUTTONS_WRAPPER_CLASS = 'uts-bubble-buttons-wrapper',
            BUBBLE_BULLETS_WRAPPER_CLASS = 'uts-bubble-bullets-wrapper',
            BUBBLE_PROGRESSBAR_WRAPPER_CLASS = 'uts-bubble-progressbar-wrapper',
            BUBBLE_CHECKBOX_WRAPPER_CLASS = 'uts-bubble-Checkbox-wrapper',
            BUBBLE_HORIZONTAL_LINE_WRAPPER_CLASS = 'uts-bubble-HorizontalLine-wrapper',
            RIGHT_CLASS = 'uts-right',
            LEFT_CLASS = 'uts-left',
            RIGHT_TOP_CLASS = 'uts-right-top',
            LEFT_TOP_CLASS = 'uts-left-top',
            MIDDLE_TOP_CLASS = 'uts-middle-top',
            MIDDLE_BOTTOM_CLASS = 'uts-middle-bottom',
            FLOAT_CLASS = 'uts-float',
            MIDDLE_SCREEN_CLASS = 'uts-middle-screen',
            BUBBLE_TOP_OFFSET = 15,
            TRIANGLE_DIMENSIONS = 30,
            MARGIN_DISTANCE = 80;


        function Bubble(pUserTour, parentWrapper, pTargetElement) {

            /* Private Variables */
            this._userTour = pUserTour;
            this._parentWrapper = parentWrapper;
            this._targetSelector;
            this._targetElement = pTargetElement;
            this._generalWrapper;
            this._tooltipTriangleWrapper;
            this._tooltipArrowsWrapper;
            this._tooltipIconWrapper;
            this._tooltipCloseIconWrapper;
            this._tooltipIconLayer;
            this._tooltipTextWrapperLayer;
            this._tooltipButtonsWrapper;
            this._tooltipBulletsWrapper;
            this._tooltipProgressBarWrapper;
            this._tooltipTitleLayer;
            this._tooltipTextLayer;
            this._tooltipHorizontalLineLayer;
            this._buttonsLayer;
            this._nextTooltipButton;
            this._skipTooltipButton;
            this._tooltipCheckboxLayer;

            /* Public Variables */
            this.title;
            this.description;
            this.arrows;
            this.bullets;
            this.progressBar;
            this.skipButton;
            this.closeIcon;
            this.horizontalLine;

            /*
                Public Methods
             */
            this.pointTo = pointTo.bind(this);
            this.setTitle = setTitle.bind(this);
            this.setDescription = setDescription.bind(this);
            this.setIcon = setIcon.bind(this);
            this.hideIcon = hideIcon.bind(this);
            this.hideButtons = hideButtons.bind(this);
            this.placeTooltip = placeTooltip.bind(this);
            this.stopListener = stopListener.bind(this);
            this.hide = hide.bind(this);
            this.show = show.bind(this);

            /* Constructor */
            build.call(this);

        }

        /*
            Private Methods
         */
        function build() {

            /* Wrapper elements creation */
            this._generalWrapper = document.createElement('div');
            this._tooltipTriangleWrapper = document.createElement('div');
            this._tooltipArrowsWrapper = document.createElement('div');
            this._tooltipCloseIconWrapper = document.createElement('div');
            this._tooltipIconLayer = document.createElement('img');
            this._tooltipIconWrapper = document.createElement('div');
            this._tooltipTextWrapperLayer = document.createElement('div');
            this._tooltipButtonsWrapper = document.createElement('div');
            this._buttonsLayer = document.createElement('div');
            this._tooltipBulletsWrapper = document.createElement('div');
            this._tooltipProgressBarWrapper = document.createElement('div');
            this._tooltipTitleLayer = document.createElement('div');
            this._tooltipTextLayer = document.createElement('div');
            this._tooltipCheckboxLayer = document.createElement('div');
            this._tooltipHorizontalLineLayer = document.createElement('div');
            this.title = this._tooltipTitleLayer;
            this.description = this._tooltipTextLayer;

            /* Wrapper elements styles */
            this._generalWrapper.className = BUBBLE_CLASS;
            this._tooltipTextWrapperLayer.className = BUBBLE_TEXT_WRAPPER_CLASS;
            this._tooltipTextLayer.className = BUBBLE_TEXT_CLASS;
            this._tooltipTitleLayer.className = BUBBLE_TITLE_CLASS;
            this._tooltipIconLayer.className = BUBBLE_ICON_CLASS;
            this._tooltipTriangleWrapper.className = BUBBLE_TRIANGLE_CLASS;
            this._tooltipArrowsWrapper.className = BUBBLE_ARROWS_CLASS;
            this._tooltipButtonsWrapper.className = BUBBLE_BUTTONS_WRAPPER_CLASS;
            this._tooltipBulletsWrapper.className = BUBBLE_BULLETS_WRAPPER_CLASS;
            this._tooltipProgressBarWrapper.className = BUBBLE_PROGRESSBAR_WRAPPER_CLASS;
            this._tooltipCheckboxLayer.className = BUBBLE_CHECKBOX_WRAPPER_CLASS;
            this._tooltipHorizontalLineLayer.className = BUBBLE_HORIZONTAL_LINE_WRAPPER_CLASS;
            this._buttonsLayer.className = BUBBLE_HORIZONTAL_LINE_WRAPPER_CLASS;

            this.skipButton = new Checkbox(this._tooltipCheckboxLayer);
            //this.bullets = new Bullets(this._tooltipBulletsWrapper);
            this.progressBar = new ProgressBar(this._tooltipProgressBarWrapper);
            this.closeIcon = new CloseIcon(this._tooltipCloseIconWrapper);
            this.arrows = new Arrows(this._tooltipArrowsWrapper, this._userTour._overlayer);
            this.customButton = new Button(this._tooltipButtonsWrapper);
            this.horizontalLine = new HorizontalLine(this._tooltipHorizontalLineLayer);

            /* Initial configuration of elements */
            this.horizontalLine.hide()
            this.skipButton.hide();
            this.customButton.hide();

            /* Attach elements phase */
            this._generalWrapper.appendChild(this._tooltipIconWrapper);
            this._generalWrapper.appendChild(this._tooltipTextWrapperLayer);
            this._generalWrapper.appendChild(this._tooltipTriangleWrapper);
            this._generalWrapper.appendChild(this._tooltipArrowsWrapper);
            this._tooltipTextWrapperLayer.appendChild(this._tooltipTitleLayer);
            this._tooltipTextWrapperLayer.appendChild(this._tooltipTextLayer);
            this._generalWrapper.appendChild(this._tooltipButtonsWrapper);
            this._generalWrapper.appendChild(this._tooltipBulletsWrapper);
            this._generalWrapper.appendChild(this._tooltipProgressBarWrapper);
            this._generalWrapper.appendChild(this._tooltipHorizontalLineLayer);
            this._generalWrapper.appendChild(this._tooltipCheckboxLayer);
            this._generalWrapper.appendChild(this._tooltipCloseIconWrapper);
            this._parentWrapper.appendChild(this._generalWrapper);

            placeTooltip.call(this);

        }

        function show() {
            this._generalWrapper.style.display = 'block';
        }

        function hide() {
            this._generalWrapper.style.display = 'none';
        }

        /**
         * Function used to indicate bubble who is the target
         * @param  {DOM element} pTargetElement target element
         * @return {NA}                NA
         */
        function pointTo(pSelector) {
            this._targetSelector = pSelector;
            this._targetElement = document.querySelector(pSelector);
            this.placeTooltip();
        }

        /**
         * Function used to set description to the bubble
         * @param {string} p_content description string
         */
        function setDescription(p_content) {
            this._tooltipTextLayer.innerHTML = p_content;
        }

        /**
         * Function used to set title to the bubble
         * @param {string} p_content title string
         */
        function setTitle(p_content) {
            this._tooltipTitleLayer.innerHTML = p_content;
        }

        /**
         * Function used to set icon to the bubble
         * @param {string} p_imageUrl url string
         */
        function setIcon(p_imageUrl) {
            this._tooltipIconLayer.setAttribute('onload', 'this.style.opacity = \'1\'');
            this._tooltipIconLayer.src = p_imageUrl;
            this._tooltipIconWrapper.appendChild(this._tooltipIconLayer);
            this._tooltipIconLayer.style.display = 'block';
        }

        /**
         * Method that hide icon image from Bubble
         * @return {NA} NA
         */
        function hideIcon() {
            this._tooltipIconLayer.style.display = 'none';
        }

        /**
         * Function used to hide buttons layers
         * @return {NA} NA
         */
        function hideButtons() {
            this._buttonsLayer.style.display = 'none';
        }

        /**
         * Function that resolves were the bubble should be placed in base
         * of the space available around the target.
         * @return {string} A string key of position
         */
        function getPosition() {

            var _newtargetElement = document.querySelector(this._targetSelector);

            if (_newtargetElement && (this._targetElement != _newtargetElement)) {
                this._targetElement = _newtargetElement;
            }

            if (!screen.isAccessible(this._targetElement, true)) {
                hide.call(this);
                return;
            } else {
                show.call(this);
            }

            var offsets = {
                target: screen.getOffset(this._targetElement),
                tooltip: screen.getOffset(this._generalWrapper),
                screen: screen.getWinSize(properties)
            };

            if (spaceAtRight(offsets)) {

                //Right
                if (spaceAtRightBottom(offsets)) {
                    return RIGHT_POSITION;
                } else {
                    if (spaceAtLeft(offsets)) {
                        return MIDDLE_TOP_POSITION;
                    } else {
                        return RIGHT_TOP_POSITION;
                    }
                }

            } else if (spaceAtLeft(offsets)) {

                //Left
                if (spaceAtLeftBottom(offsets)) {
                    return LEFT_POSITION;
                } else {
                    if (spaceAtRight(offsets)) {
                        return MIDDLE_BOTTOM_POSITION;
                    } else {
                        return LEFT_TOP_POSITION;
                    }
                }

            } else {

                //Middle
                if (spaceAtBottom(offsets)) {
                    return MIDDLE_BOTTOM_POSITION;
                } else if (spaceAtTop(offsets)) {
                    return MIDDLE_TOP_POSITION;
                } else {
                    if (isTall(offsets)) {
                        return MIDDLE_SCREEN;
                    } else {
                        return FLOAT_POSITION;
                    }
                }
            }

            function spaceAtRight(offsets) {
                return ((offsets.target.left + offsets.target.width + offsets.tooltip.width + MARGIN_DISTANCE) < offsets.screen.width);
            }

            function spaceAtMiddleRight(offsets) {
                return ((offsets.target.left + (offsets.target.width / 2) + offsets.tooltip.width) < offsets.screen.width);
            }

            function spaceAtLeft(offsets) {
                return (offsets.target.left > offsets.tooltip.width + MARGIN_DISTANCE);
            }

            function spaceAtMiddleLeft(offsets) {
                return ((offsets.target.left + (offsets.target.width / 2) - offsets.tooltip.width) < offsets.screen.width);
            }

            function spaceAtTop(offsets) {
                return (offsets.target.top > offsets.tooltip.height + TRIANGLE_DIMENSIONS);
            }

            function spaceAtBottom(offsets) {
                return ((offsets.target.height + offsets.target.top + offsets.tooltip.height + TRIANGLE_DIMENSIONS) < offsets.screen.height);
            }

            function spaceAtRightBottom(offsets) {
                return ((BUBBLE_TOP_OFFSET + offsets.target.top + offsets.tooltip.height + TRIANGLE_DIMENSIONS) < offsets.screen.height);
            }

            function spaceAtLeftBottom(offsets) {
                return ((BUBBLE_TOP_OFFSET + offsets.target.top + offsets.tooltip.height + TRIANGLE_DIMENSIONS) < offsets.screen.height);
            }

            function isTall(offsets) {
                return (offsets.target.height > offsets.screen.height);
            }
        }

        function resetStyles() {

            this._generalWrapper.style.top = null;
            this._generalWrapper.style.right = null;
            this._generalWrapper.style.bottom = null;
            this._generalWrapper.style.left = null;
            this._generalWrapper.style.marginLeft = null;
            this._generalWrapper.style.marginTop = null;

            this._tooltipArrowsWrapper.style.display = 'inherit';
            this._generalWrapper.className = BUBBLE_CLASS;
        }

        /**
         * Render tooltip box in the page
         */
        function placeTooltip() {

            /* END NEW IMPLEMENTATION */
            var currentStepObj,
                tooltipOffset,
                targetElementOffset,
                _newtargetElement,
                _screen;

            //We prevent that a current element step is null. We always maintain a string selector
            //to recover it.
            _newtargetElement = document.querySelector(this._targetSelector);
            if (_newtargetElement && (this._targetSelector != _newtargetElement)) {
                this._targetElement = _newtargetElement;
            }

            //reset the old style
            resetStyles.call(this);

            //We wait until the element is accessible
            if (!screen.isAccessible(this._targetElement, true)) {
                return;
            } else {
                this._userTour._steps.stopElementSearch();
            }

            //Bubble position resolution
            targetElementOffset = screen.getOffset(this._targetElement);
            tooltipOffset = screen.getOffset(this._generalWrapper);
            _screen = screen.getWinSize(properties);

            switch (getPosition.call(this)) {
                case 'right':
                    this._generalWrapper.classList.add(RIGHT_CLASS);
                    this._generalWrapper.style.left = (screen.getOffset(this._targetElement).width + TRIANGLE_DIMENSIONS) + 'px';
                    break;
                case 'left':
                    this._generalWrapper.classList.add(LEFT_CLASS);
                    this._generalWrapper.style.right = (screen.getOffset(this._targetElement).width + TRIANGLE_DIMENSIONS) + 'px';
                    break;
                case 'middle-top':
                    this._generalWrapper.classList.add(MIDDLE_TOP_CLASS);
                    this._generalWrapper.style.top = '-' + (screen.getOffset(this._generalWrapper).height + TRIANGLE_DIMENSIONS) + 'px';
                    this._generalWrapper.style.left = (targetElementOffset.width / 2 - tooltipOffset.width / 2) + 'px';
                    break;
                case 'middle-bottom':
                    this._generalWrapper.classList.add(MIDDLE_BOTTOM_CLASS);
                    this._generalWrapper.style.left = (targetElementOffset.width / 2 - tooltipOffset.width / 2) + 'px';
                    this._generalWrapper.style.bottom = '-' + (tooltipOffset.height + TRIANGLE_DIMENSIONS) + 'px';
                    break;
                case 'right-top':
                    this._generalWrapper.classList.add(RIGHT_TOP_CLASS);
                    this._generalWrapper.style.top = '-' + (screen.getOffset(this._generalWrapper).height + TRIANGLE_DIMENSIONS) + 'px';
                    this._generalWrapper.style.left = (targetElementOffset.width / 2) + 'px';
                    break;
                case 'left-top':
                    this._generalWrapper.classList.add(LEFT_TOP_CLASS);
                    this._generalWrapper.style.top = '-' + (screen.getOffset(this._generalWrapper).height + TRIANGLE_DIMENSIONS) + 'px';
                    this._generalWrapper.style.left = (targetElementOffset.width / 2 - tooltipOffset.width) + 'px';
                    break;
                case 'float':
                    this._generalWrapper.classList.add(FLOAT_CLASS);
                    //we have to adjust the top and left of layer manually for intro items without element
                    this._generalWrapper.style.marginLeft = '-' + (tooltipOffset.width / 2) + 'px';
                    this._generalWrapper.style.marginTop = '-' + (tooltipOffset.height / 2) + 'px';

                    break;
                case 'middle-screen':
                    this._generalWrapper.classList.add(MIDDLE_SCREEN_CLASS);
                    //we have to adjust the top and left of layer manually for intro items without element
                    this._generalWrapper.style.left = (targetElementOffset.width / 2 - tooltipOffset.width / 2) + 'px';
                    this._generalWrapper.style.marginTop = (_screen.height / 2) - (tooltipOffset.height / 2) - screen.getOffset(this._generalWrapper).top + 'px';
                    break;
                default:
                    this._generalWrapper.classList.add(RIGHT_CLASS);
                    this._generalWrapper.style.left = (screen.getOffset(this._targetElement).width + TRIANGLE_DIMENSIONS) + 'px';
                    break;
            }

            //We wait until the current element stops moving and then we resolve global close button
            if (!this._userTour._overlayer._isMoving && this._userTour._overlayer.closeButton) {

                var bounds = this._generalWrapper.getBoundingClientRect();

                if ((bounds.right >= (window.innerWidth - 150)) && (bounds.top < 40)) {

                    this._userTour._overlayer.closeButton.toBottom(true);

                } else {

                    this._userTour._overlayer.closeButton.toTop(true);

                }

            }

            document.removeEventListener('ut-tick', this.placeTooltip, true);
            document.addEventListener('ut-tick', this.placeTooltip, true);

        }

        /**
         * Method that stops ticker event listeneer
         * @return {NA} NA
         */
        function stopListener() {
            document.removeEventListener('ut-tick', this.placeTooltip, true);
        }

        /* Return Bubble class as module */
        return Bubble;

    }
