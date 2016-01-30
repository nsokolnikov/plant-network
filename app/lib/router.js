FlowRouter.route('/plants/', {
    action: function(params, queryParams) {
        BlazeLayout.render('listTemplate', {content: 'plantList'});
        console.log("Yeah! We are on the post:", params);
    }
});

FlowRouter.route('/', {
    action: function(params, queryParams){

    }
});

FlowRouter.route('/login/', {
    name: "login",
    action: function(params, queryParams){
        console.log("login page!");
    }
})