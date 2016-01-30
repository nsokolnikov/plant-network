Template.body.helpers({
    plants: function() {
        return Plant.find();
    }
})

Template.body.events({
    "click": function() {
        AntiModals.alert('Test');
    }
})