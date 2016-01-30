Template.plantPopup.helpers({
  info: function(){
      return Session.get('currentPopup');
  },
    latestMoisture: function(plant_id){
        return Measurements.findOne({plant_id:plant_id},{sort:{time:-1}})
    }
})