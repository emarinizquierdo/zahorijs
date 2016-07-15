//File: controllers/steps.js
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

//GET - Return all Steps in the DB
exports.findAllApps = function(req, res) {

    if(req && req.user){
      Users.findOne({email : req.user.email},function(err, user) {

          if (err) res.send(500, err.message);

          console.log('GET /Apps')
          res.status(200).jsonp(user.apps);

      });
    }else{
      res.status(403).send('forbiden');
    }


};

//POST - Insert a new TVShow in the DB
exports.updateApps = function(req, res) {

    console.log('UPDATE');
    console.log(req.body);

    if(req && req.user){
      Users.findOne({email : req.user.email},function(err, user) {

          if (err) res.send(500, err.message);

          console.log('GET /Apps')
          updateApp(user.apps, {appId : req.body.appId, appName : req.body.appName, timestamp : new Date().getTime()});
          user.save(function(err, user) {
              if (err) return res.status(500).send(err.message);
              res.status(200).jsonp(user.apps);
          });

      });
    }else{
      res.status(403).send('forbiden');
    }

};

function updateApp(apps, app){

  for(var i=0; i < apps.length; i++){

    if(apps[i].appId == app.appId){
      apps[i] = app;
      return;
    }

  }

  apps.push(app);

}
