Users = new Mongo.Collection("users");
Measurements = new Mongo.Collection("measurements");

if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);
    // This code only runs on the client
    Template.body.helpers({
        tasks: [
            {text: "This is task 1"},
            {text: "This is task 2"},
            {text: "This is task 3"}
        ]
    });




    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
            Users.insert({name: prompt("Enter name")});
        }
    });
}

if (Meteor.isServer) {
    Meteor.methods({
        'addNewMeasurement' : function(time,plant_id,type,data) {
            Measurements.insert({
                time:time,
                plant_id:plant_id,
                type:type,
                data:data
            })
        }
    })
}
Meteor.startup(function () {
    if (Meteor.isServer) {
    }


    // code to run on server at startup
});
