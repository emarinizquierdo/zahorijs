(function(riot) {
    'use strict'

    require('./editor.tag');
    require('../pointer/pointer.tag');
    require('../stepsStack/stepsStack.tag');
    require('../toursManager/toursManager.tag');
    require('../modalEditor/modalEditor.tag');
    var Steps = require('../steps');
    var Tours = require('../tours');

    function Editor() {

        /* Revealing Methods */
        this.init = init.bind(this);
        this.tours = new Tours();
        this.steps = new Steps();

    }

    /**
     * Initialise our application's code.
     */
    function init() {

        document.body.appendChild(document.createElement('ut-editor'));
        riot.mount('*');

    }

    module.exports = Editor;

})(window.riot);
