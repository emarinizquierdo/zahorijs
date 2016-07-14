window._shared = {};

import tag from './views/zjs-main.tag';
import './components/zjs-user-phantom.tag';
import navbar from './components/zjs-navbar.tag';

riot.route.base('/');
riot.mount('*');
riot.route.start(true);
riot.route('home');
