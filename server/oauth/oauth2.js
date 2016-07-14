var GoogleStrategy = require('passport-google-oauth20').Strategy;
var config = require('../config.json');
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

module.exports = function(passport, router) {

    function extractProfile(profile) {
        var imageUrl = '';
        var email = '';

        if (profile.photos && profile.photos.length) {
            imageUrl = profile.photos[0].value;
        }

        if (profile.emails && profile.emails.length) {
            email = profile.emails[0].value;
            console.log(email);
        }

        return {
            id: profile.id,
            displayName: profile.displayName,
            email: email,
            image: imageUrl
        };
    }

    // Configure the Google strategy for use by Passport.js.
    //
    // OAuth 2-based strategies require a `verify` function which receives the
    // credential (`accessToken`) for accessing the Google API on the user's behalf,
    // along with the user's profile. The function must invoke `cb` with a user
    // object, which will be set at `req.user` in route handlers after
    // authentication.
    passport.use(new GoogleStrategy({
        clientID: config['OAUTH2_CLIENT_ID'],
        clientSecret: config['OAUTH2_CLIENT_SECRET'],
        callbackURL: config['OAUTH2_CALLBACK'],
        accessType: 'offline'
    }, function(accessToken, refreshToken, profile, cb) {
        // Extract the minimal profile information we need from the profile object
        // provided by Google

        var _profile = extractProfile(profile);

        Users.findOne({
            email: _profile.email
        }, function(err, user) {

            if (!user) {

                var user = new Users({
                    email: _profile.email
                });

                user.save(function(err, user) {
                    cb(null, _profile);
                });

            } else {
                cb(null, _profile);
            }

        });

    }));

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });


    router.get(
        // Login url
        '/auth/login',

        // Save the url of the user's current page so the app can redirect back to
        // it after authorization
        function(req, res, next) {
            if (req.query.return) {
                req.session.oauth2return = req.query.return;
            }
            next();
        },

        // Start OAuth 2 flow using Passport.js
        passport.authenticate('google', {
            scope: ['email', 'profile']
        })
    );

    router.get(
        // OAuth 2 callback url. Use this url to configure your OAuth client in the
        // Google Developers console
        '/auth/google/callback',

        // Finish OAuth 2 flow using Passport.js
        passport.authenticate('google'),

        // Redirect back to the original page, if any
        function(req, res) {
            var redirect = req.session.oauth2return || '/';
            delete req.session.oauth2return;

            res.redirect(redirect);

        }
    );

    // Middleware that exposes the user's profile as well as login/logout URLs to
    // any templates. These are available as `profile`, `login`, and `logout`.
    function addTemplateVariables(req, res, next) {
        res.locals.profile = req.user;
        res.locals.login = '/auth/login?return=' +
            encodeURIComponent(req.originalUrl);
        res.locals.logout = '/auth/logout?return=' +
            encodeURIComponent(req.originalUrl);
        next();
    }

    return router;

}
