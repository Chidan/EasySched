SuperAppManager.module('SearchApp', function (SearchApp, SuperAppManager, Backbone, Marionette, $, _) {

    SearchApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": "showSearch"
        }
    });


    var API = {
        showSearch: function () {
            SearchApp.Show.Controller.showSearch();
        }
    };


    SuperAppManager.addInitializer(function () {
        new SearchApp.Router({
            controller: API
        });
    });

});