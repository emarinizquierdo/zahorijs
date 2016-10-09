var properties = {

    service: '/api'
};

properties.services = {
    user: properties.service + '/user',
    users: properties.service + '/users',
    me : properties.service + '/me',
    apps : properties.service + '/apps',
    subscriptions : properties.service + '/subscriptions',
    braintree : properties.service + '/braintree'
};

export default properties;
