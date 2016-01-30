(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// plant-network.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isClient) {                                                 // 1
    // counter starts at 0                                             //
    Session.setDefault('counter', 0);                                  // 3
    // This code only runs on the client                               //
    Template.body.helpers({                                            // 5
        tasks: [{ text: "This is task 1" }, { text: "This is task 2" }, { text: "This is task 3" }]
    });                                                                //
    Template.hello.helpers({                                           // 12
        counter: function () {                                         // 13
            return Session.get('counter');                             // 14
        }                                                              //
    });                                                                //
                                                                       //
    Template.hello.events({                                            // 18
        'click button': function () {                                  // 19
            // increment the counter when button is clicked            //
            Session.set('counter', Session.get('counter') + 1);        // 21
        }                                                              //
    });                                                                //
}                                                                      //
Meteor.startup(function () {                                           // 25
    if (Meteor.isServer) {}                                            // 26
                                                                       //
    // code to run on server at startup                                //
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=plant-network.js.map
