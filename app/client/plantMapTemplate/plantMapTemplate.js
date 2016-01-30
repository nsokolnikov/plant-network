Template.body.helpers({
    plants: function() {
        return Plant.find();
    }
})

Template.body.events({
    "click": function() {
        AntiModals.overlay('plantPopup',{
            url:this.url,
            owner:this.user_id
        });
    }
})