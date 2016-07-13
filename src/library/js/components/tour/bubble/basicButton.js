
export default BasicButton;

	    function BasicButton(p_parentWrapper) {

        /*
            Public Variables
         */
        this.generalWrapper = document.createElement('div');
        this.action;

        /*
            Public Methods
         */
        this.setText = setText;
        this.setAction = setAction;
        this.addClass = addClass;
        this.enable = enable;
        this.disable = disable;
        this.show = show;
        this.hide = hide;

        /*
            Private Methods
         */
        function setText(p_text) {
            this.generalWrapper.innerHTML = p_text;
        }

        function setAction(p_action) {

            this.action = p_action;
            this.generalWrapper.onclick = this.action;

        }

        function addClass(p_classes) {
            $(this.generalWrapper).addClass(p_classes);
        }

        function enable() {
            $(this.generalWrapper).removeClass("uts-disabled");
        }

        function disable() {
            $(this.generalWrapper).addClass("uts-disabled");
        }

        function show() {
            this.generalWrapper.style.display = 'block';
        }

        function hide() {
            this.generalWrapper.style.display = 'none';
        }

				function build(){
					this.hide();
				}

				build.call(this);

    }