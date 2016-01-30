Template.body.helpers({
    plants: function() {
        return Plant.find();
    }
})

Template.body.events({
    "click": function() {
        Session.set('currentPopup',this);
        AntiModals.overlay('plantPopup',{})
    }
})