Template.plantAnnotation.events({
    "click": function() {
        Session.set('currentPopup',this);
        AntiModals.overlay('plantPopup',{});
    }
});