Template.plantCard.onCreated(function() {
    var template = this;
    console.log(this);
    template.subscribe('recentEventsByPlant', parseInt(this.data._id));
    template.subscribe('imageFromPlant', this.data.image_id);
    template.subscribe('plantsAndUsers');
});

Template.plantCard.helpers({
    imageURL: function(plant) {
        console.log(this);
        return Images.findOne(this.image_id);
    },
    statusMessage: function() {
        var events = Events.find().fetch();
        for(var i = 0; i < events.length; i++) {
            if(events[i].eventType === 'great') {
                return "UGH... finally you feed me...";
            }
        }
        return Plant.findOne({_id: this._id}).status;
    }
});

Template.plantCard.events({
    'click ': function(plant) {
        return Images.findOne(this.image_id);
    }
});
Template.plantList.onCreated(function() {
   this.route = new ReactiveVar(FlowRouter.current().path);
});
Template.plantList.helpers({
    userPlants: function() {
        var plants;
            return Plant.find({user_id: Meteor.userId()});

    },
    route: function() {
        var pathRedirect = '/' + Meteor.userId() + '/nearby';
        if(Template.instanc().route.get() === pathRedirect) {
            return true;
        } else {
            return false;
        }
    },
    plants: function() {

        return Plant.find();
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