var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Steps = new Schema({
    id: Number,
    title: {
      es_ES: String,
      en_US: String
    },
    intro: {
      es_ES: String,
      en_US: String
    },
    doClick: Boolean,
    typewrite: Boolean,
    typewriteValue: String,
    icon: {
      url: String
    },
    enableCustomButton: Boolean,
    customButton: {
      es_ES: String,
      en_US: String
    },
    urlCustomButton: String,
    selector: String
});

var Tours = new Schema({
    id : String,
    apiKey : String,
    name: {
      es_ES: String,
      en_US: String
    },
    steps:[],
    published: Boolean
});

var Users = new Schema({
    email : String,
    apiKey : String,
    apps : []
});

module.exports = mongoose.model('Steps', Steps);
module.exports = mongoose.model('Tours', Tours);
module.exports = mongoose.model('Users', Users);
