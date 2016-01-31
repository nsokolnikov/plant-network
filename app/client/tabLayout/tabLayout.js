Template.tabLayout.events({
    'click #myplants': function(event, template) {
        var pathRedirect = '/' + Meteor.userId() + '/plants';
        if(FlowRouter.current().path !== pathRedirect) {
            FlowRouter.go(pathRedirect);
        }
    },
    'click #office': function(event, template) {
        var pathRedirect = '/' + Meteor.userId() + '/nearby';
        if(FlowRouter.current().path !== pathRedirect) {
            FlowRouter.go(pathRedirect);
        }
    },
    'click .logout': function(event, template) {
        Accounts.logout();
        FlowRouter.go('/');
    }
});