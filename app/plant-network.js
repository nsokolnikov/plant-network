
if (Meteor.isClient) {

    Template.registerHelper("debug", function (debugStuff) {
        return console.log(debugStuff);
    });

}