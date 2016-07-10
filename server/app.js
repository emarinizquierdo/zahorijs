var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    http = require("http"),
    server = http.createServer(app),
    mongoose = require('mongoose'),
    models = require('./models')(app, mongoose),
    router = express.Router(),
    routes = require('./routes')(router);



/* Express configuration */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
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