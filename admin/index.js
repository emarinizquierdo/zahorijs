(function($window) {

    $window.riot = require('riot');
    require('./styles/main.css');
    var Editor = require('./components/editor');

    $window.bbva = $window.bbva || {};
    $window.bbva.usertour = $window.bbva.usertour || {};

    $window.bbva.usertour.editor = new Editor();
    $window.bbva.usertour.editor.init();

})(window);
