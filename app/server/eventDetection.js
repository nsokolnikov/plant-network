Meteor.methods({
   eventDetection: function(threshold, windowSize, plantId, timestamp) {
       if (threshold <= 0) {
           throw Meteor.Error("Threshold must be positive");
       }

       if (windowSize < 2) {
           throw Meteor.Error("Window must have a value of at least 2");
       }

       console.log("in event detection!!");
       var previousAvg = LastEvent.findOne({plant_id: plantId});
       var event = {};
       var currentAvgWindow = Measurements.find({plant_id: plantId}, {sort: {time: -1}, limit: windowSize}).fetch();
       var currentAvg = _.reduce(currentAvgWindow, function (result, data) {
                   return result + data.data;
               }, 0) / currentAvgWindow.length;
       if (previousAvg) {
           var runningEventThreshold = currentAvg / previousAvg;
           if (runningEventThreshold > threshold) {
           } else if (runningEventThreshold < (1 / threshold)) {
               event.eventType = 'great';
           } else {
               event.eventType = 'ok';
           }
       } else {
           event.eventType = 'ok'
       }
       event.time = timestamp;
       event.plant_id = plantId;
       event.avg = currentAvg;

       Events.insert(event);
       LastEvent.upsert(
           {plant_id: plantId},
           {$set: {
               plant_id: plantId,
               eventType: event.eventType,
               time: timestamp,
               avg: currentAvg
           }
       });
   }
});