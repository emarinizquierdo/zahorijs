window._shared = {};

import './components/zjs-user-phantom.tag';
import './views/zjs-main.tag';

riot.route.base('/');
riot.mount('*');
riot.route.start(true);

if(location.href.substr(-1) == "#"){
  window.location.href="/";
}
