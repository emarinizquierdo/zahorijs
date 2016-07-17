var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    http = require("http"),
    server = http.createServer(app),
    mongoose = require('mongoose'),
    models = require('./models')(app, mongoose),
    router = express.Router(),
    passport = require('passport'),
    auth = require('./oauth/oauth2.js')(passport, router),
    session = require('express-session'),
    routes = require('./routes')(router),
    path = require('path');


/* Express configuration */

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var mongodbHost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var mongodbPort = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
var mongo_url = (process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost') + "/zahorijs";

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

app.use(express.static(path.join(__dirname + '/../dist')));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());
app.use(authRequired);
app.use(routes);


/* MongoDB connect */
mongoose.connect(mongo_url, function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    app.listen(server_port, server_ip_address, function() {
        console.log("Listening on " + server_ip_address + ", server_port " + server_port)
    });
});


// Middleware that requires the user to be logged in. If the user is not logged
// in, it will redirect the user to authorize the application and then return
// them to the original URL they requested.
function authRequired(req, res, next) {
    console.log(req.path);
    if (req.user || req.path === '/api/me' || req.path === '/auth/login' || req.path === '/auth/logout' || req.path === '/auth/google/callback') {
        next();
        return;
    }

    if (!req.user) {
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/auth/login');
    }

    next();
}
