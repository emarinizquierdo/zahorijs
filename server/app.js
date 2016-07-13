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
    routes = require('./routes')(router);



/* Express configuration */
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(session({ secret: 'keyboard cat', resave: true,
    saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride());
    app.use(authRequired);
    app.use(routes);



/* MongoDB connect */
mongoose.connect('mongodb://localhost/steps', function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    app.listen(3000, function() {
        console.log("Node server running on http://localhost:3000");
    });
});


// Middleware that requires the user to be logged in. If the user is not logged
// in, it will redirect the user to authorize the application and then return
// them to the original URL they requested.
function authRequired(req, res, next) {
  console.log(req.path);
    if (req.user || req.path === '/auth/login' || req.path === '/auth/google/callback'){
      next();
      return;
    }

    if (!req.user) {
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/auth/login');
    }

    next();
}
