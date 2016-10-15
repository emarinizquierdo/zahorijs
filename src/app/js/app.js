'use strict'

import './views/zjs-main.tag';
import './model/subscriptions.js';

riot.route.base('/');
riot.mount('*');
riot.route.start(true);

if(location.href.substr(-1) == "#"){
  window.location.href="/";
}
