
export {environment, purgue, submit, change, extend}

    function purgue(selector) {

        var ANGULAR_PURGUE_CLASSES = /.ng-isolate-scope|.ng-pristine|.ng-valid|.ng-scope/g;

        return selector.replace(ANGULAR_PURGUE_CLASSES, '');

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

    function environment() {

        var _locationSplitted = window.location.hostname.split("-");
        var _environmentsSupported = ["dev", "au"];
        var _environment;

        if (_locationSplitted[0] === "localhost") {
            _environment = {
                env: "local",
                envPrefix: "",
            };

        } else {

            var _environmentIndex = _environmentsSupported.indexOf(_locationSplitted[0]);

            if (_environmentIndex == -1) {
                _environment = {
                    env: "pro",
                    envPrefix: ""
                };
            } else {
                _environment = {
                    env: _environmentsSupported[_environmentIndex],
                    envPrefix: _environmentsSupported[_environmentIndex] + "-"
                };
            }
        }

        return _environment;

    }

    function extend(defaults, options) {

        var options = JSON.parse(JSON.stringify(options));

        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    }


