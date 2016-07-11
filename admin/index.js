(function($window) {

    $window.riot = require('riot');
    require('./styles/main.css');
    var Editor = require('./components/editor');

    $window.zahorijs = $window.zahorijs || {};
    $window.zahorijs = $window.zahorijs || {};

    $window.zahorijs.editor = new Editor();
    $window.zahorijs.editor.init();

})(window);
