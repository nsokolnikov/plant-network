var socket = io('http://192.168.43.92:8080/');
Tasks = new Mongo.Collection("tasks");
Tasks.insert({id: "thecounter", counter: 0});

    // This code only runs on the server
Meteor.publish("tasks", function () {
    return Tasks.find();
});

Meteor.setInterval(function() {
    Tasks.update(Tasks.findOne(), {
        $set: {counter: Math.random() * 200}
    });
    console.log(Tasks.findOne().counter);
}, 1000);

// subscribe to a data feed
socket.emit('subscribe', 'tasks');

// we can now handle connect, disconnect, and data-driven events
// NOTE: you must open up a new fiber using Meteor.bindEnvironment
// in order to perform Mongo read/writes or call Meteor methods
// within the socket connection

// on connect
socket.on('connect', Meteor.bindEnvironment(function() {
    console.log('Connected to the websocket!');
//    Meteor.call('methodName1');

    // on data event
    socket.on('data-event', Meteor.bindEnvironment(function(data) {
        console.log(data);
 //       Meteor.call('methodName2');
    }, function(e) {
        throw e;
    }));

    // on disconnect
    socket.on('disconnect', Meteor.bindEnvironment(function() {
        console.log('Disconnected from the websocket!');
//        Meteor.call('methodName3');
    }, function(e) {
        throw e;
    }));

}, function(e) {
    throw e;
}));