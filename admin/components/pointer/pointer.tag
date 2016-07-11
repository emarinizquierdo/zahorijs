<pointer>

    <script>

        var utils = require('../../services/utils');

        //Models
        var tours = zahorijs.editor.tours;

        /* Constants */
        var CONTEXT_UTS_HIGHLIGHT_CLASS = "uts-highlight";
        var modalEditor;

        /* Public Variables */
        this.tours = tours;
        this.currentSelector;

        /* Event handlers */
        this.on('mount', build.bind(this));


        /* Private Methods */
        function build() {

            modalEditor = this.parent.tags['modal-editor'];
            mouseListener.call(this);
            clickListener.call(this);

        }

        /**
         * Method that listen mouse event and apply in elements a class
         * to highlight them
         * @return {NA} NA
         */
        function mouseListener(){

            document.addEventListener('mouseover', function(event) {

                // TODO: uncomment this lines:
                if(!this.tours.activeTour || this.tours.isLoading || this.tours.stopRecord ){
                  return;
                }

                var selector = utils.getCSSPath(event.target);

                if (selector) {

                    if(utils.checkIfIsUTS(event.path)){
                      return;
                    }

                    var element = document.querySelector(selector);
                    
                    if(element){
                        element.className = element.className + " uts-highlight";
                    

                        var removeLayer = function(e) {

                            if (e.target) {
                                e.target.className = e.target.className.replace(" uts-highlight", "");
                                e.target.removeEventListener('mouseout', removeLayer);
                            }

                        }

                        element.addEventListener('mouseout', removeLayer);

                    }

                }

            }.bind(this));

        }

        /**
         * Method that listen for click mouse event and extract the DOM element selector
         * wich is necessary for indentify it
         * @return {NA} NA
         */
        function clickListener() {

            document.addEventListener("click", function(e) {

              if (e.target.className.indexOf(CONTEXT_UTS_HIGHLIGHT_CLASS) >= 0) {
                  e.stopPropagation();
                  e.preventDefault();
                  this.currentSelector = utils.getCSSPath(e.target).replace('.' + CONTEXT_UTS_HIGHLIGHT_CLASS, '');
                  addSimpleStep.call(this, this.currentSelector);
              }

            }.bind(this), true);
        }

        /**
         * Method that open modalEditor component.
         */
        function addSimpleStep( ){
            modalEditor.open(this.currentSelector);
        }

    </script>

</pointer>
