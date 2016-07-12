import '../styles/main.css';

import Core from './core'
import tag from './views/app-main.tag'
import navbar from './views/app-navi.tag'




window.zahorijs = window.zahorijs || {};
window.zahorijs = new Core();


riot.route.base('/')
riot.mount('*')
riot.route.start(true)
