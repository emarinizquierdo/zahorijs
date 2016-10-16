export default {

    atom : 'USERTOUR',

    connector: {
        local: '',
        dev: 'http://zahorijs-nefele.rhcloud.com/',
        au: 'http://zahorijs-nefele.rhcloud.com/',
        pro: 'http://zahorijs-nefele.rhcloud.com/'
    },

    services: {
        local: {},
        dev: {},
        au: {},
        pro: {},
        commons: {
            icons: '/icons/bubble',
            tour: '/tours',
            users: '/users'
        }
    },

    events : {
        LANG_CHANGED: 'zahorijss.langChanged'
    }

}
