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


