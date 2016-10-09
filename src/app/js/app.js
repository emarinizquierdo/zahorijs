window._shared = {};

import subscriptions from './components/zjs-user-phantom.tag';
import './views/zjs-main.tag';
import './model/subscriptions.js';

riot.route.base('/');
riot.mount('*');
riot.route.start(true);

if(location.href.substr(-1) == "#"){
  window.location.href="/";
}
