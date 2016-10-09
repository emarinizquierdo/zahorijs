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
    owner : Schema.Types.ObjectId,
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
    customerId : String,
    apiKey : String,
    displayName: String,
    image: String,
    apps : [],
    role : String
});

var Subscriptions = new Schema({
    id: Number,
    email: String,
    subscriptionId: String,
    planType: String
});

module.exports = mongoose.model('Steps', Steps);
module.exports = mongoose.model('Tours', Tours);
module.exports = mongoose.model('Users', Users);
module.exports = mongoose.model('Subscriptions', Subscriptions);
