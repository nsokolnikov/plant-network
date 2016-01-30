Template.plantPopup.helpers({
  info: function(){
      return Session.get('currentPopup');
  },
    latestMoisture: function(plant_id){
        console.log(plant_id);
        var moistures = Measurements.find({plant_id:plant_id},{sort:{time:-1},limit:3600,skip:600}).fetch();
        if (moistures.length == 0) {
            var moisture = Measurements.findOne({plant_id:plant_id},{sort:{time:-1}});
            return moisture.data;
        } else {
            var total = 0.0;
            for (var moisture in moistures) {
                total += moisture.data;
            }
            return total/moisture.count();
        }
    }
})