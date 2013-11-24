SuperAppManager.module('SignupApp', function (SignupApp, SuperAppManager, Backbone, Marionette, $, _) {

    SignupApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "signup": "showSingup"
        }
    });


    var API = {
        showSingup: function () {
            SignupApp.Show.Controller.showSignup();
        }
    };

    SuperAppManager.on("signup:show", function () {
        SuperAppManager.navigate("signup");
        API.showSignup();
    });


    SuperAppManager.addInitializer(function () {
        new SignupApp.Router({
            controller: API
        });
    });

});









