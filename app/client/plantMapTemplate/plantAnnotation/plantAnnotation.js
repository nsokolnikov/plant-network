Template.plantAnnotation.events({
    "click": function() {
        Session.set('currentPopup',this);
        AntiModals.overlay('plantPopup',{});
    }
});

Template.plantAnnotation.helpers({
    image: function () {
        return Images.findOne({_id:this.image_id}); // Where Images is an FS.Collection instance
    }
});