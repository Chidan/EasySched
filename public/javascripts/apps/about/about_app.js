SuperAppManager.module('AboutApp', function (AboutApp, SuperAppManager, Backbone, Marionette, $, _) {
    AboutApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "about": "showAbout"
        }
    });

    var API = {
        showAbout: function () {
            AboutApp.Show.Controller.showAbout();
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "about");
        }
    };

    SuperAppManager.on("about:show", function () {
        SuperAppManager.navigate("about");
        API.showAbout();
    });

    SuperAppManager.addInitializer(function () {
        new AboutApp.Router({
            controller: API
        });
    });
});

