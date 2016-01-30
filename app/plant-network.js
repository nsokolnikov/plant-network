if (Meteor.isClient) {

    Template.registerHelper("dialogBoxOptions", function (debugStuff) {
        return console.log(debugStuff);
    });

}