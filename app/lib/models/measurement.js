Measurements = {
    collection: new Mongo.Collection("measurements"),
    add: function (time, plant_id, type, data) {
        Meteor.call('addNewMeasurement', time, plant_id, type, data);
    },
    getWindow: function (low, high, user_id) {
        Meteor.call('getMeasurementsForTime', low, high, user_id);
    },
    getAllMeasurements: function(){
        return Meteor.call('getAllMeasurements');
    },
    burnThemAll: function(){
        Meteor.call('burnThemAll');
    }
};



Meteor.methods({
    'addNewMeasurement': function (time, plant_id, type, data) {
        var toInsert = {
            time: time,
            plant_id: plant_id,
            type: type,
            data: data
        }
        Measurements.collection.insert(toInsert);
    },
    'burnThemAll' : function(){
        Measurements.collection.drop()
    },
    'addSomeTestMeasurements': function() {
      for (var i = 0; i < 10; i++) {
          Meteor.call('addNewMeasurement',i,0,1,i*10);
      }
    },

    'getMeasurementsForTime': function (low, high, user_id) {
        return Measurements.collection.find({user_id: user_id, time: {$gt: low, $lt: high}}, {sort: {time: -1}}).fetch();
    },
    'getAllMeasurements': function(){
        return Measurements.collection.find({}, {sort:{createdAt:1}, limit:10}).fetch();
    }
});