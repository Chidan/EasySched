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


    SuperAppManager.addInitializer(function () {
        new SignupApp.Router({
            controller: API
        });
    });

});









