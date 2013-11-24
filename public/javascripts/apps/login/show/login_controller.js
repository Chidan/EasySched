//This module will instantiate our view and handle the events
SuperAppManager.module('LoginApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Controller = {

        showLogin: function () {

            var newUser = new SuperAppManager.Entities.User();
            var loginView = new Show.LoginForm({
                model: newUser
            });


            loginView.on("form:submit", function (data) {

                //this.model.save(data);

                this.model.save(data, {
                    success: function (model, response) {

                        console.log('Login successful');

                        //SuperAppManager.trigger("contacts:filter", filterCriterion);
                    },
                    error: function () {
                        console.log('Login failed');
                    }
                });
            });

            loginView.on("form:signup", function () {
                SuperAppManager.trigger("signup:show");

            });

            SuperAppManager.mainRegion.show(loginView);
        }
    }
})
;