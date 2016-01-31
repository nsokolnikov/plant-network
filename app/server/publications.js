Meteor.publish('recentMeasurementByPlant', function (plant_id) {
    console.log(plant_id);
    return Measurements.find({plant_id: plant_id}, {sort: {time: -1}, limit: 60});
});

Meteor.publish('imageFromPlant', function(image_id) {
    console.log(image_id);
   return Images.find(image_id);
});

Meteor.publish('plantsAndUsers', function () {
    return [
        Plant.find({}),
        Users.find({})
    ];
});

