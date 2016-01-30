Template.body.helpers({
    plants: function() {
        return Plant.find();
    }
})

Template.body.events({
    "click": function() {
        console.log(this);
        Session.set('currentPopup',this);
        AntiModals.overlay('plantPopup',{})
    }
})