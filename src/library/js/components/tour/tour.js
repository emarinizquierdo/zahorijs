import steps from './steps';
import bubble from './bubble/bubble';
import overlayer from './overlayer/overlayer';
import Ticker from '../../services/ticker';
import Screen from '../../services/screen';
import {change, submit} from '../../utils';

export default tour;

function tour(properties, lang) {

        
        var JOURNEY = [];

        /* Get Constructors */
        var Steps = steps(properties);
        var Bubble = bubble(properties, lang);
        var Overlayer = overlayer(properties, lang);
        var screen = Screen(properties);


        /**
         * Tour class
         */
        function Tour() {

            /* Private Variables */
            this._steps;
            this._currentStep;
            this._overlayer;
            this._bubble;
            this._ticker;
            this._running = false; //Variable that tell us if tour is running

            /* Public Variables */

            /* Revealing Methods */
            this.start = start.bind(this);
            this.stop = end.bind(this)

        }


        /* Private Methods */

        /**
         * Function that start the tour
         * @return {NA} NA
         */
        function start(steps) {

            this._steps = new Steps(steps || JOURNEY);
            this._ticker = new Ticker();
            this._ticker.start();

            this._running = true;

            goToStep.call(this, 0);

        }

        /**
         * Function that ends user tour
         * @return {[type]} [description]
         */
        function end() {

            if (!this._running) {
                return;
            }

            this._running = false;
            this._ticker.end();
            this._bubble.stopListener();
            this._overlayer.stopListener();
            this._bubble.arrows.setKeyboardControl(this._running);
            this._bubble._generalWrapper.remove();
            this._overlayer.globalWrapper.remove();
            this._steps.stopElementSearch();
            this._steps = null;
            this._currentStep = null;
            this._overlayer = null;
            this._bubble = null;
            this._ticker = null;

        }

        /**
         * Generic Function that moves to a specific step of the Tour
         * @param  {integer} pointer Integer in steps range
         * @return {NA}         NA
         */
        function goToStep(pointer) {

            var _currentElement,
                _nextAccessible,
                _previousAccessible;

            //If pointer is in correct step range
            if ((0 <= pointer) && (pointer < this._steps.steps.length)) {

                //We have to hide bubble to prevent show it when usertour are looking
                //for new steps.
                if(this._bubble){
                    this._bubble.hide();
                }

                //We go to the specific step given by pointer
                this._currentStep = this._steps.goTo(pointer);

                //Get DOM element of the current step
                _currentElement = document.querySelector(this._currentStep.selector);

                screen.isAccessible(_currentElement);

                //Point overlayer and bubble to the target
                if (!this._overlayer) {
                    this._overlayer = new Overlayer(this, _currentElement);
                    this._overlayer.closeButton.setAction(function(){
                        end.call(this)
                    }.bind(this));
                }

                //We have to show spinner in each step.
                this._overlayer.spinner.show();
                //We have a timeout in wich an element has to be resolved. If this
                //timeout expires, we have to find the next available step that will be loaded.
                this._steps.startElementSearch(function(nextAvailableStep) {
                    goToStep.call(this, nextAvailableStep);
                }.bind(this));


                if (!this._bubble) {
                    this._bubble = new Bubble(this, this._overlayer.wrapper, _currentElement);
                    this._bubble.arrows.setKeyboardControl(this._running);
                }

                //Update position of the overlay and the bubble
                this._overlayer.pointTo(this._currentStep.selector);
                this._bubble.pointTo(this._currentStep.selector);

                //We give to the bubble metadata
                lang.setMultiLangText(this._bubble.title, this._currentStep.title);
                lang.setMultiLangText(this._bubble.description, this._currentStep.intro);

                //Set close button
                this._bubble.closeIcon.show();
                this._bubble.closeIcon.setAction(function(){
                    end.call(this)
                }.bind(this));

                //Set the step icon if it exists
                if (this._currentStep.icon && this._currentStep.icon.imageUrl) {
                    this._bubble.setIcon(this._currentStep.icon.imageUrl || this._currentStep.icon);
                } else {
                    this._bubble.hideIcon();
                }

                if (this._currentStep.enableCustomButton) {
                    lang.setMultiLangText(this._bubble.customButton.generalWrapper, this._currentStep.customButton);
                    this._bubble.customButton.show();
                    if (this._currentStep.urlCustomButton) {

                        this._bubble.customButton.setAction(function(){

                            if(properties.isInHPD){

                                //TODO SOMETHING WITH OPENURL

                            }else{

                                window.open(this._currentStep.urlCustomButton, "");

                            }


                        }.bind(this));


                    }
                } else {
                    this._bubble.customButton.hide();
                }

                //Set bullets if there are more than one step
                //this._bubble.bullets.paint(this._steps);
                this._bubble.progressBar.render(this._steps);

                //If there are steps 'at right' we add 'right' button
                if ((this._steps.getPointer() + 1 < this._steps.total()) || this._currentStep.doClick) {
                    this._bubble.arrows.right.setAction(function() {

                        //When the step is typewrite, the step has to write in the input value and press enter
                        if (this._currentStep.typewrite) {

                            var _input = document.querySelector(this._currentStep.selector);

                            if (_input) {
                                _input.value = this._currentStep.typewriteValue;
                            }

                            change(this._currentStep.selector);
                            submit(this._currentStep.selector);

                        }

                        //When the step is doClick, the step has to do click
                        if (this._currentStep.doClick) {

                            this._overlayer.clicker.click(function() {

                                nextStepOrEnd.call(this);

                            }.bind(this));

                            var _element = document.querySelector(this._currentStep.selector);
                            if (_element) {
                                _element.click();
                            }

                        } else {

                            nextStepOrEnd.call(this);
                        }

                        function nextStepOrEnd() {
                            if ((this._steps.getPointer() + 1 < this._steps.total())) {
                                goToStep.call(this, this._steps.getPointer() + 1)
                            } else {
                                end.call(this);
                            }
                        }

                    }.bind(this));
                    this._bubble.arrows.right.show();
                } else {
                    this._bubble.arrows.right.hide();
                }

            }

        }

        /* Return Tour Class as module */
        return Tour;

    }