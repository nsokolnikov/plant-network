Users = new Mongo.Collection("users");

if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);
    // This code only runs on the client
}

Meteor.startup(function () {
    if (Meteor.isServer) {
    }


    // code to run on server at startup
});
