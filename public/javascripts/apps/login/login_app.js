SuperAppManager.module('LoginApp', function (LoginApp, SuperAppManager, Backbone, Marionette, $, _) {

    LoginApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "login": "showLogin"
        }
    });


    var API = {
        showLogin: function () {
            LoginApp.Show.Controller.showLogin();
        }
    };

    SuperAppManager.on("login:show", function () {
        SuperAppManager.navigate("login");
        API.showLogin();
    });

    SuperAppManager.addInitializer(function () {
        new LoginApp.Router({
            controller: API
        });
    });

});










