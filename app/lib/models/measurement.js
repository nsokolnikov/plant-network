Measurements = new Mongo.Collection("measurements");

Measurements.helpers({
    'addNewMeasurement' : function(time,plant_id,type,data) {
        Measurements.insert({
            time:time,
            plant_id:plant_id,
            type:type,
            data:data
        })
    },

    'getMeasurementsForTime' : function(low,high,user_id){
        return Measurements.find({user_id: user_id,time:{$gt:low, $lt:high}},{sort: {time: -1}}).fetch();
    }
});