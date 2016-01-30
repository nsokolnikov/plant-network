FlowRouter.route('/blog/:category/:postId', {
    name: "blog",
    action: function(params, queryParams) {

    }
});

FlowRouter.route('/login/', {
    name: "login",
    action: function(params, queryParams){
        console.log("login page!");
    }
})

if (Meteor.isClient) {

    Template.registerHelper("debug", function (debugStuff) {
        return console.log(debugStuff);
    });

}