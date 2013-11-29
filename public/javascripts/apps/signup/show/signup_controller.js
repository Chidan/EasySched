//This module will instantiate our view and handle the events
SuperAppManager.module('SignupApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Controller = {

        showSignup: function () {

            var newUser = new SuperAppManager.Entities.User();
            var signupView = new Show.SignupPanel({
                model: newUser
            });


            signupView.on("form:submit", function (data) {

                //this.model.save(data);

                this.model.save(data, {
                    success: function (model, response) {

                        console.log('back in business');
                        alert('New user created: ' + model.get('username') );
                        SuperAppManager.dialogRegion.closeDialog();

                        //SuperAppManager.trigger("contacts:filter", filterCriterion);
                    },
                    error: function () {
                        console.log('business failed');
                        alert('New user creation failed'),
                        SuperAppManager.dialogRegion.closeDialog();
                    }
                });
            });

            /*
            signupView.on("show", function () {
                this.$el.dialog({
                    modal: true,
                    width: "auto"
                });
            });
            SuperAppManager.dialogRegion.show(signupView);
            */

            SuperAppManager.dialogRegion.show(signupView);
        }
    }
})
;