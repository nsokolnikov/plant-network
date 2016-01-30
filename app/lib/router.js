FlowRouter.route('/plants', {
    action: function(params, queryParams) {
        BlazeLayout.render('mainLayout', {content: 'plantList'});
        console.log("Yeah! We are on the post:", params);
    }
});

FlowRouter.route('/nearby', {
    action: function(params, queryParams) {
        BlazeLayout.render('plantMapTemplate', {content: 'plantMapTemplate'});
    }
});

FlowRouter.route('/add', {
    action: function(params, queryParams) {
        BlazeLayout.render('newPlantTemplate', {content: 'newPlantTemplate'});
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