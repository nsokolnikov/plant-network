Template.registerHelper("debug", function (debugStuff) {
    return console.log(debugStuff);
});

Template.mainLayout.events({
    "click #loginbutton" : function (event, template){
        event.stopPropagation();
        console.log("hi you");
        FlowRouter.go('/login');
    }

});