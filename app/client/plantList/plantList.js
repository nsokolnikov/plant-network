Template.plantList.helpers({
    plants: function() {return Plant.find();}
});

Template.plantList.events({
    'click .plant': function(event, template) {
        Session.set('currentPopup',this);
        AntiModals.overlay('plantPopup',{});
    },
    'click .btn-floating': function() {
        AntiModals.overlay('newPlantTemplate',{});
    }
});