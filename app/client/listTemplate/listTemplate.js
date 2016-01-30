Template.listTemplate.helpers({
    users: function() {
        return Users.find();
    }meteo
});

Template.listTemplate.events({
    'click .button': function() {
        console.log("YAYAY");
    }
});