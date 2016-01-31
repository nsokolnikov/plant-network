Template.plantCard.onCreated(function() {
    this.subscribe('imageFromPlant', this.data.image_id);
    $(document).ready(function(){
        $('.tooltipped').tooltip({delay: 50});
    });
    console.log(this);
});

Template.plantCard.helpers({
    imageURL: function(plant) {
        console.log(this);
        return Images.findOne(this.image_id);
    }
});



Template.plantList.helpers({
    plants: function() {
        return Plant.find({user_id: Meteor.userId()});
    },
    owner: function() {
        return Users.findOne(this.user_id);
    },
    picture: function() {
        return Plant.findOne(this._id).picture().url;
    },
    office: function() {
        return Plant.find(this.location);
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