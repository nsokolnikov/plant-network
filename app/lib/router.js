FlowRouter.route('/plants', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout', {content: 'plantList'});
        console.log("Yeah! We are on the post:", params);
    }
});

FlowRouter.route('/_oauth/google', {
    action: function(params, queryParams) {
        console.log(queryParams);
    }
});

FlowRouter.route('/nearby', {
    action: function(params, queryParams) {
        BlazeLayout.render('plantMapTemplate', {content: 'plantMapTemplate'});
    }
});

FlowRouter.route('/', {
    action: function(params, queryParams){
        BlazeLayout.render('mainLayout',{content: 'plantNetwork'})
    }
});



FlowRouter.route('/login', {
    name: "login",
    action: function(params, queryParams){
    BlazeLayout.render('mainLayout', {content: 'atForm'})
    }
});

Accounts.onLogin(function(user) {

});