import {extend} from '../utils';

export default lang;

function lang(properties) {


        var lang;

        function Lang() {

            this.currentLang = "es_ES";
            this.DICTIONARY = {
                "es_ES": {},
                "en_US": {}
            };

            this.Literal = Literal;

            /* Revealing Methods */
            this.setLang = setLang.bind(this);
            this.setMultiLangText = setMultiLangText.bind(this);
            this.addDictionary = addDictionary.bind(this);

            __init__.call(this);

        }

        /**
         * Constructor of the Lang class
         * @return {NA} NA
         */
        function __init__() {



        }

        /**
         * Method that change currentLang and propagate to any Literal instance
         * @param {string} pLang accepted Lang [en_US | es_ES]
         */
        function setLang(pLang) {

            this.currentLang = (pLang == "en_US" || pLang == "en_GB") ? "en_US" : "es_ES";
            var event = new Event(properties.events.LANG_CHANGED);
            // Dispatch the event.
            document.dispatchEvent(event);
        }

        /**
         * Method that add a new subset to a global DICTIONARY
         * @param {object} subset standar dictionary object { "en_US" : {}, "es_ES" : {}}
         */
        function addDictionary(subset) {

            this.DICTIONARY.es_ES = (subset.es_ES) ? extend(this.DICTIONARY.es_ES, subset.es_ES) : this.DICTIONARY.es_ES;
            this.DICTIONARY.en_US = (subset.en_US) ? extend(this.DICTIONARY.en_US, subset.en_US) : this.DICTIONARY.en_US;

        };

        function setMultiLangText(pElement, pDictionary){

            pElement.innerHTML = (pDictionary[lang.currentLang]) ? pDictionary[lang.currentLang] : "";

            document.addEventListener(properties.events.LANG_CHANGED, function() {
                pElement.innerHTML = (pDictionary[lang.currentLang]) ? pDictionary[lang.currentLang] : "";
            });

        }

        /**
         * Literal class.
         * With this class you can create a span multilanguage element that
         * listen for LANG_CHANGED event triggered for setLang
         */
        function Literal( ) {

            /* Public Variable */
            this.element = document.createElement('span');

            __init__.call(this);

            /* Revealing Methods */
            this.setText = setText.bind(this);

        }

        /**
         * Method used to set a multilanguage reference with the global DICTIONARY
         * @param {string} text DICTIONARY KEY string
         */
        function setText(text) {

            this.element.innerHTML = (lang.DICTIONARY[lang.currentLang]) ? lang.DICTIONARY[lang.currentLang][text] : text;

            document.addEventListener(properties.events.LANG_CHANGED, function() {
                this.element.innerHTML = (lang.DICTIONARY[lang.currentLang]) ? lang.DICTIONARY[lang.currentLang][text] : text;
            }.bind(this));

        }

        lang = new Lang();

        return lang;

    }
