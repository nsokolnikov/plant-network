Template.landingPage.events({
    "click #loginbutton, click #loginLink": function (event, template) {
        console.log("ttt");
        FlowRouter.go('/login');
    }
})
