var properties = {

    service: '/api'
};

properties.services = {
    user: properties.service + '/user',
    users: properties.service + '/users',
    me : properties.service + '/me',
    apps : properties.service + '/apps'
};

export default properties;
