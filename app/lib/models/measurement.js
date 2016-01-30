Measurements = new Mongo.Collection("measurements");

Measurements.helpers({
    'addNewMeasurement' : function(time,plant_id,type,data) {
        Measurements.insert({
            time:time,
            plant_id:plant_id,
            type:type,
            data:data
        })
    }
});