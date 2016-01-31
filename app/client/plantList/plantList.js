Template.plantList.helpers({
    plants: function() {
        return Plant.find();
    },
    owner: function() {
        return Users.findOne(this.user_id);
    },
    picture: function() {
        return Plant.findOne(this._id).picture();
    }
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