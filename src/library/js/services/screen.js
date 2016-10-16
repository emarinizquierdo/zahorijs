
export default screen;

function screen(properties) {

        /**
         * Screen class
         */
        function Screen() {

            /* Revealing Methods */
            this.getOffset = getOffset.bind(this);
            this.isAccessible = isAccessible.bind(this);
            this.getWinSize = getWinSize.bind(this);

            /* Constructor */
            __init__.call(this);

        }

        /**
         * Screen Constructor
         * @return {NA} NA
         */
        function __init__() {


        }

        /**
         * Get an element position on the page
         */
        function getOffset(element) {

            var elementPosition = {};

            //var offset = (element) ? $(element).offset() : {};
            var elementTop = element.getBoundingClientRect().top;
            var elementLeft = element.getBoundingClientRect().left;

            //set width
            elementPosition.width = element.offsetWidth;
            //set height
            elementPosition.height = element.offsetHeight;

            //calculate element top and left
            var _x = 0;
            var _y = 0;
            while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
                _x += element.offsetLeft;
                _y += element.offsetTop;
                element = element.offsetParent;
            }

            //set top
            //elementPosition.top = offset.top;
            elementPosition.top = elementTop;
            //set left
            //elementPosition.left = offset.left;
            elementPosition.left = elementLeft;

            return elementPosition;
        }

        /**
         * Check if an element is out  viewport
         */
        function isElementOutViewport(el) {
            var rect = el.getBoundingClientRect();
            return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
        }

        /**
         * Check if element exists and is visible.
         * If doesn't, try to move scroll into him.
         * If p_onlyTest is true, the scroll has to be restored at the end
         */
        function isAccessible(p_element, p_onlyTest) {

            var _element,
                _isAccessible;

            //grab the element with given selector from the page
            _element = p_element;

            if ((typeof _element === "object") &&
                (_element !== null) &&
                (_element.style.display.indexOf("none") < 0) &&
                (_element.offsetWidth > 0) &&
                (_element.offsetHeight > 0)
            ) {

                _isAccessible = !isElementOutViewport(_element);


                if (!_isAccessible) {

                    _element.scrollIntoView(true);

                    if (!isElementOutViewport(_element)) {
                        return true;
                    }

                }

                if(properties.header && properties.header > 0){
                    scrollElmVert(_element, -properties.header);
                }

                return _isAccessible;
            }

            return false;

        }

        function scrollElmVert(el,num) { // to scroll up use a negative number
            var originalElement = el;
            var re=/html$/i;
            while(!re.test(el.tagName) && (1 > el.scrollTop)) el=el.parentNode;
            if(((originalElement.offsetTop - el.scrollTop) < num) || (originalElement.offsetTop - el.scrollTop > num)) el.scrollTop = originalElement.offsetTop + num;
        }

        /**
         * Provides a cross-browser way to get the screen dimensions
         */
        function getWinSize(properties) {

            if (properties.isInHPD) {
                return {
                    width: window.innerWidth,
                    height: properties.screen.height
                }
            } else {


                if (window.innerWidth != undefined) {
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                } else {
                    var D = document.documentElement;
                    return {
                        width: D.clientWidth,
                        height: D.clientHeight
                    };
                }
            }
        }

        return new Screen();

    }
