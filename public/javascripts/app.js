//Application
var ContactManager = new Backbone.Marionette.Application();

//Adding regions
ContactManager.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({ el: "#dialog-region" })
});

ContactManager.navigate = function (route, options) {
    //setting default options if no options is provided by the calling function
    options || (options = {});
    Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function () {
    return Backbone.history.fragment
};

//Initializing the application - initialize after handler
ContactManager.on("initialize:after", function () {
    if (Backbone.history) {
        Backbone.history.start();

        if (this.getCurrentRoute() === "") {
            ContactManager.trigger("contacts:list");
        }
    }
});


