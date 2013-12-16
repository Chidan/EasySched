SuperAppManager.module('MyAppsApp', function (MyAppsApp, SuperAppManager, Backbone, Marionette, $, _) {

    MyAppsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "myApps": "showMyApps"
        }
    });


    var API = {
        showMyApps: function () {
            MyAppsApp.Show.Controller.showMyApps();
        }
    };

    SuperAppManager.on("myApps:show", function () {
        SuperAppManager.navigate("myApps");
        API.showMyApps();
    });

    SuperAppManager.addInitializer(function () {
        new MyAppsApp.Router({
            controller: API
        });
    });

});