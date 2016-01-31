Template.landingPage.events({
    "click #loginbutton, click #loginLink": function (event, template) {
        console.log("ttt");
        FlowRouter.go('/login');
    },
    "click .toPopUp": function(event, template){
        console.log("thing");
        var elemebt = document.querySelector(".toPopUp");
        elemebt.style.backgroundColor = "#ffaa44";
        var elementt = document.querySelector(".newOne");
        elementt.style.display = "inline-block";
    }
})

