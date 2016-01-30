Template.listTemplate.helpers({
    users: function() {
        return Users.find();
    }
});

Template.listTemplate.events({
    'click .button': function() {
        console.log("YAYAY");
    }
});