export default {

    atom : 'USERTOUR',

    connector: {
        local: '/bbva-intranet',
        dev: '/bbva-intranet',
        au: '/bbva-intranet',
        pro: '/bbva-intranet'
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