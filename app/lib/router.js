function checkLoggedIn(ctx, redirect) {
    if (!Meteor.userId()) {
        redirect('/login');
    }
}

function redirectIfLoggedIn(ctx, redirect) {
    console.log(ctx)
    var _id = Meteor.userId();
    if (_id) {
        redirect('/' + _id + '/plants');
    }
}

var publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [
        redirectIfLoggedIn
    ]
});


publicRoutes.route('/', {
    name: 'landingPage',
    action: function (params, queryParams) {
        BlazeLayout.render('landingPage', {mainContent: 'index'});
    }
});


publicRoutes.route('/login', {
    name: "login",
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {mainContent: 'atForm'})
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
        BlazeLayout.render('mainLayout', {mainContent: 'plantList', headerContent: 'tabLayout'}, function (err, succ) {
            if (err) {
                console.log(err);
            }
        });
    }
});

privateRoutes.route('/:user_id/nearby', {
    action: function (params, queryParams) {
        BlazeLayout.render('mainLayout', {mainContent: 'plantList', headerContent: 'tabLayout'});
    }
});

if (Meteor.isClient) {
    Accounts.onLogin(function (user) {
        var path = FlowRouter.current().path;
        // we only do it if the user is in the login page
        if (path === "/login") {
            FlowRouter.go('/' + Meteor.userId() + '/plants');
        }
    });
}
