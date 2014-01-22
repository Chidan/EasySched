//Application
var SuperAppManager = new Backbone.Marionette.Application();

//Adding regions
SuperAppManager.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({ el: "#dialog-region"})
});

//setting up navigation history for back/forward/refresh etc..
SuperAppManager.navigate = function (route, options) {
    //setting default options if no options is provided by the calling function
    options || (options = {});
    Backbone.history.navigate(route, options);
};

SuperAppManager.getCurrentRoute = function () {
    return Backbone.history.fragment
};

//Check if user is logged in during initialization of SuperAppManager
SuperAppManager.on('initialize:before', function () {

    SuperAppManager.loggedInUser = new SuperAppManager.Entities.LoginUser();

    SuperAppManager.loggedInUser.fetch({
        success: function (data) {

            if (SuperAppManager.loggedInUser.get('username') != undefined)
                SuperAppManager.trigger("user:loggedIn");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });


    /*  $.ajax({
     type: "GET",
     url: '/loggedIn',
     dataType: "json",
     cache: false,
     success: function (data) {
     alert('login successful: ' + data);
     },
     error: function (jqXHR, textStatus, errorThrown) {
     alert('error ' + textStatus + " " + errorThrown);
     }
     });*/
});


//Initializing the application - initialize after handler
SuperAppManager.on("initialize:after", function () {
    if (Backbone.history) {
        Backbone.history.start();

//Commenting out this block of code since we will have a new home page for search
        /*        if (this.getCurrentRoute() === "") {
         SuperAppManager.trigger("contacts:list");
         }*/
    }
});

//Declaring global variables and global functions here

SuperAppManager.loggedInUser = {};
//window.loggedInUser = {};


//Noty
window.SuperAppManager.Flash = {
    notice: function (msg) {
        return this.notification('notice', 3000, msg);
    },
    alert: function (msg) {
        return this.notification('alert', false, msg);
    },
    error: function (msg) {
        return this.notification('error', 3000, msg);
    },
    success: function (msg) {
        return this.notification('success', 3000, msg);
    },
    notification: function (type, timeout, msg) {
        $.noty.closeAll();
        return noty({
            text: msg,
            type: type,
            theme: 'defaultTheme',
            layout: "topCenter",
            animation: {
                open: {
                    height: "toggle"
                },
                close: {
                    height: "toggle"
                },
                easing: 'swing',
                speed: 500
            },
            timeout: timeout,
            closeWith: ['click', 'button'],
            modal: false
        });
    }
};





