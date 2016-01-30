function checkLoggedIn(ctx, redirect) {
    if (!Meteor.userId()) {
        redirect('/login');
    }
}

function redirectIfLoggedIn(ctx, redirect) {
    var _id = Meteor.user();
    if (_id) {
        redirect('/' + _id + '/plants');
    }
}

var exposed = FlowRouter.group();

exposed.route('/',{
    name: "landing",
    action: function(params, queryParams){

    }
})

exposed.route('/login', {
    name: "login",
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {content: 'atForm'})
    }
});

var privateRoutes = FlowRouter.group({
    name: 'private',
    triggersEnter: [
        checkLoggedIn
    ]
});

privateRoutes.route('/:user_id/plants', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {content: 'plantList'}, function (err, succ) {
            if (err) {
                console.log(err);
            }
        });
    }
});

privateRoutes.route('/:user_id/nearby', {
    action: function (params, queryParams) {
        BlazeLayout.render('plantMapTemplate', {content: 'plantMapTemplate'});
    }
});

FlowRouter.route('/add', {
    action: function (params, queryParams) {
        BlazeLayout.render('newPlantTemplate', {content: 'newPlantTemplate'});
    }
});

FlowRouter.route('/', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {content: 'plantNetwork'})
    }
});
if(Meteor.isClient) {
    Accounts.onLogin(function (user) {
        var path = FlowRouter.current().path;
        // we only do it if the user is in the login page
        if (path === "/login") {
            FlowRouter.go('/' + Meteor.userId() + '/plants');
        }
    });
}
