(function($window) {
    'use strict'

    function environment() {

        var _locationSplitted = $window.location.hostname.split("-");
        var _environment;

        if (_locationSplitted[0] === "localhost") {
            _environment = {
                env: "localhost",
                envPrefix: "",
                isLocalhost: true
            };

        } else {

            _environment = {
                env: "pro",
                envPrefix: "",
                isLocalhost: false
            };

        }

        return _environment;

    }

    function checkIfIsUTS(path) {

        var _planePath = path.map(function(item) {

            var _auxString = "";
            _auxString += (item.id || "");

            return _auxString;

        }).join(" ");

        return ((_planePath.indexOf('uts') >= 0) || (_planePath.indexOf('medium-editor') >= 0));

    }

    /**
     * Get full CSS path of any element
     *
     * Returns a jQuery-style CSS path, with IDs, classes and ':nth-child' pseudo-selectors.
     *
     * Can either build a full CSS path, from 'html' all the way to ':nth-child()', or a
     * more optimised short path, stopping at the first parent with a specific ID,
     * eg. "#content .top p" instead of "html body #main #content .top p:nth-child(3)"
     */
    function cssPath(el) {
        var fullPath = 0, // Set to 1 to build ultra-specific full CSS-path, or 0 for optimised selector
            useNthChild = 0, // Set to 1 to use ":nth-child()" pseudo-selectors to match the given element
            cssPathStr = '',
            testPath = '',
            parents = [],
            parentSelectors = [],
            tagName,
            cssId,
            cssClass,
            tagSelector,
            vagueMatch,
            nth,
            i,
            c;

        // Go up the list of parent nodes and build unique identifier for each:
        while (el) {
            vagueMatch = 0;

            // Get the node's HTML tag name in lowercase:
            tagName = el.nodeName.toLowerCase();

            // Get node's ID attribute, adding a '#':
            cssId = (el.id) ? ('#' + el.id) : false;

            // Get node's CSS classes, replacing spaces with '.':
            cssClass = (el.className) ? ('.' + el.className.replace(/\s+/g, ".")) : '';

            // Build a unique identifier for this parent node:
            if (cssId) {
                // Matched by ID:
                tagSelector = tagName + cssId + cssClass;
            } else if (cssClass) {
                // Matched by class (will be checked for multiples afterwards):
                tagSelector = tagName + cssClass;
            } else {
                // Couldn't match by ID or class, so use ":nth-child()" instead:
                vagueMatch = 1;
                tagSelector = tagName;
            }

            // Add this full tag selector to the parentSelectors array:
            parentSelectors.unshift(tagSelector)

            // If doing short/optimised CSS paths and this element has an ID, stop here:
            if (cssId && !fullPath)
                break;

            // Go up to the next parent node:
            el = el.parentNode !== document ? el.parentNode : false;

        } // endwhile


        // Build the CSS path string from the parent tag selectors:
        for (i = 0; i < parentSelectors.length; i++) {
            cssPathStr += ' ' + parentSelectors[i]; // + ' ' + cssPathStr;

            // If using ":nth-child()" selectors and this selector has no ID / isn't the html or body tag:
            if (useNthChild && !parentSelectors[i].match(/#/) && !parentSelectors[i].match(/^(html|body)$/)) {

                // If there's no CSS class, or if the semi-complete CSS selector path matches multiple elements:
                if (!parentSelectors[i].match(/\./) || $(cssPathStr).length > 1) {

                    // Count element's previous siblings for ":nth-child" pseudo-selector:
                    for (nth = 1, c = el; c.previousElementSibling; c = c.previousElementSibling, nth++);

                    // Append ":nth-child()" to CSS path:
                    cssPathStr += ":nth-child(" + nth + ")";
                }
            }

        }

        // Return trimmed full CSS path:
        return cssPathStr.replace(/^[ \t]+|[ \t]+$/, '');
    }

    function getCSSPath(node) {
        var ind, parts, siblingsArr, str;
        parts = [];
        while (node.parentElement) {
            str = node.tagName.toLowerCase();
            if (node.id) {
                str += "#" + node.id;
                //parts.unshift(str);
                //break;
            }
            siblingsArr = Array.prototype.slice.call(node.parentElement.childNodes);
            ind = siblingsArr.filter(function(n) {
                return n.attributes != null;
            }).indexOf(node);
            parts.unshift(str + (":nth-child(" + (ind + 1) + ")"));
            node = node.parentElement;
        }
        return parts.join(' > ');
    }

    function purgue(selector) {

        var ANGULAR_PURGUE_CLASSES = /.ng-isolate-scope|.ng-pristine|.ng-valid|.ng-scope|/g;

        return selector.replace(ANGULAR_PURGUE_CLASSES, '').replace(/\.\./g, '.');

    }

    function submit(selector) {

        var _element;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("submit", false, true);

        if (typeof selector === "object") {
            if (selector === document.body) {
                return;
            } else {
                selector.dispatchEvent(evt);
                submit(selector.parentElement);
            }
        } else {
            _element = document.querySelector(selector)
            _element.dispatchEvent(evt);
            submit(_element.parentElement);
        }

    }

    function change(selector) {

        var _element = document.querySelector(selector);

        if ("createEvent" in document) {

            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            _element.dispatchEvent(evt);

        } else {

            //_element.fireEvent("onchange");
            //_element.fireEvent("onsubmit");

        }

    }

    function jsonExport(pJson) {

        var thisDate = new Date();
        var fileName = location.host + "_" +
            thisDate.getFullYear() + "_" +
            thisDate.getMonth() + "_" +
            thisDate.getDate() + "_" +
            thisDate.getHours() + "_" +
            thisDate.getMinutes() + "_" +
            thisDate.getSeconds() + ".json";

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pJson));
        var dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", fileName);
        dlAnchorElem.click();

    }

    function setStyle(pStyle) {
        return JSON.stringify(pStyle).replace(/{|}|"/g, "").replace(",", ";"); //"
    }

    /* Public Methods */
    exports.environment = environment;
    exports.purgue = purgue;
    exports.submit = submit;
    exports.change = change;
    exports.getCSSPath = getCSSPath;
    exports.checkIfIsUTS = checkIfIsUTS;
    exports.jsonExport = jsonExport;
    exports.setStyle = setStyle;

})(window);
