Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

Template.newPlantTemplate.events({
    'click .hiddenFileInputContainter img':function(event) {
        var input = $('#flupld');
        //input.change(event);
        input.trigger('click');
    },
    'change #flupld':function(event,template){
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
            console.log(files[i]);
            Images.insert(files[i], function (err, fileObj) {
                // Inserted new doc wi th ID fileObj._id, and kicked off the data upload using HTTP
            });
        }
    },
    'click .main-button':function(event) {
        console.log('clicked');
    },
    'click .hidden':function(event) {
        createNewPlant();
        console.log("sumbit clicked");
        event.stopPropagation();
    },
    'click a':function()  {
        function showPosition(position) {
            var location = $('#location');
            var label = $('#locationLabel');



            var long = position.coords.longitude;
            var lat = position.coords.latitude;

            //icon--order-success svg

            //console.log(label.text());
            label.text('');
            location.val(long + ' ' + lat);
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    },
    createNewPlant: function() {
        var nickname = $('#nickname').val();
        var serial = $('#serial').val();
        var location = $('#location').val();
    }
});

Template.newPlantTemplate.rendered = function(){
    'use strict';

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    var $mainButton = $(".main-button"),
        $closeButton = $(".close-button"),
        $buttonWrapper = $(".button-wrapper"),
        $ripple = $(".ripple"),
        $layer = $(".layered-content"),
        $checkmark = $('.icon');

    function close() {
        $buttonWrapper.removeClass("clicked");
        $ripple.removeClass("rippling");
        $layer.removeClass("active");
    }

    function showCheckmark() {
        var icon = $('.icon');
        //icon.removeClass('icon--order-success svg');
        icon.addClass('icon--order-success svg');
        icon.css('display','inline');
    }

    $mainButton.on("click", function(){
        $ripple.addClass("rippling");
        $buttonWrapper.addClass("clicked").delay(1500).queue(function(){
            $layer.addClass("active");
        });
        setTimeout(function() { showCheckmark(); }, 3000);
        setTimeout(function() { close(); }, 5000);
    });
}