Template.plantAnnotation.events({
    "click": function() {
        AntiModals.overlay('plantPopup',{data:this});
    }
});

Template.plantAnnotation.helpers({
    image: function () {
        return Images.findOne({_id:this.image_id}); // Where Images is an FS.Collection instance
    }
});