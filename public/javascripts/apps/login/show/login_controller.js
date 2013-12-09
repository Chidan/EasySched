//This module will instantiate our view and handle the events
SuperAppManager.module('LoginApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Controller = {

        showLogin: function () {

            var newUser = new SuperAppManager.Entities.LoginUser();
            var loginView = new Show.LoginForm({
                model: newUser
            });


            loginView.on("form:submit", function (data) {

                //this.model.save(data);

                this.model.save(data, {
                    success: function (model, response) {

                        alert('You have been loggedin: ' + data.username);
                        SuperAppManager.trigger("user:loggedIn", data.username);
                        SuperAppManager.dialogRegion.closeDialog();


                        //SuperAppManager.trigger("contacts:filter", filterCriterion);
                    },
                    error: function () {
                        console.log('Login failed');
                        alert('Wrong userid or password');
                        SuperAppManager.dialogRegion.closeDialog();
                    }
                });
            });

            loginView.on("form:signup", function () {
                SuperAppManager.trigger("signup:show");

            });

            SuperAppManager.dialogRegion.show(loginView);
        }
    }
})
;