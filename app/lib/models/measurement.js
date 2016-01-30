Measurements = new Mongo.Collection("measurements");

Measurements.helpers({
    add: function (time, plant_id, type, data) {
        Meteor.call('addNewMeasurement', time, plant_id, type, data);
    },
    getWindow: function (low, high, user_id) {
        Meteor.call('getMeasurementsForTime', low, high, user_id);
    }
});

Meteor.methods({
    'addNewMeasurement': function (time, plant_id, type, data) {
        Measurements.insert({
            time: time,
            plant_id: plant_id,
            type: type,
            data: data
        })
        console.log("Test")
    },

    'addSomeTestMeasurements': function() {
      for (var i = 0; i < 10; i++) {
          Meteor.call('addNewMeasurement',i,0,1,i*10);
      }
    },

    'getMeasurementsForTime': function (low, high, user_id) {
        return Measurements.find({user_id: user_id, time: {$gt: low, $lt: high}}, {sort: {time: -1}}).fetch();
    },
    'getAllMeasurements': function(){
        return Measurements.findAll();
    }
});