var properties = {

    service: '/api'
};

properties.services = {
    user: properties.service + '/user',
    me : properties.service + '/me',
    apps : properties.service + '/apps'
};

export default properties;
