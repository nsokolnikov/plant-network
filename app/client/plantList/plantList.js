Template.plantList.helpers({
    plants: function() {return Plant.find();}
});

Template.plantList.events({
    'click .plant': function(event, template) {
        AntiModals.overlay()
    }
});