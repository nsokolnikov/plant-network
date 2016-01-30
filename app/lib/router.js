FlowRouter.route('/blog/:postId', {
    action: function(params, queryParams) {
        console.log("Yeah! We are on the post:", params.postId);
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