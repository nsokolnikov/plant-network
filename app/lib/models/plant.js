Plant = new Mongo.Collection('plant');

Plant.helpers({
    user: function() {
        return Users.findOne(this.user_id);
    },
    incrementLevel: function(cb) {
        Meteor.call('incrementLevel', this.user_id);
    }
});


Meteor.methods({
   incremenetLevel: function(user_id) {
       Plant.update(user_id, {$inc: {level: 1}});
   }
});