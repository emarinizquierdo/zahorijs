
export default HorizontalLine;

function HorizontalLine(pParentWrapper) {

        /*
            Public Variables
         */
        var hr = document.createElement('hr');


        /*
            Public Methods
         */
        this.show = show;
        this.hide = hide;

        /*
            Private Methods
         */
        function build( pWrapper ){
          pWrapper.appendChild(hr);
        }

        function show() {
            hr.style.display = 'block';
        }

        function hide() {
            hr.style.display = 'none';
        }

        build.call(this, pParentWrapper);

    }