Meteor.publish('recentMeasurementByPlant', function (plant) {
    return Measurements.collection.find({plant_id: plant._id}, {sort: {date: -1}, limit: 100});
});

Meteor.publish('imageFromPlant', function(image_id) {
   return Images.find(image_id);
});

Meteor.publish('plantsAndUsers', function () {
    return [
        Plant.find({}),
        Users.find({})
    ];
});

