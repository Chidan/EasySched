SuperAppManager.module('BusinessApp.New', function (New, SuperAppManager, Backbone, Marionette, $, _) {

    New.Controller = {

        newBusiness: function () {
            var newBusiness = new SuperAppManager.Entities.Business();
            var businessView = new SuperAppManager.BusinessApp.New.BusinessView({
                model: newBusiness
            });

            businessView.on("form:submit", function (data) {

                console.log("save clicked --- " + data);

                this.model.save(data, {

                    success: function (model, response) {
                        if (response.login == "failed") {
                            SuperAppManager.Flash.error('Please login to create new business ');
                            SuperAppManager.trigger("login:show");
                            //SuperAppManager.dialogRegion.closeDialog();
                        }
                        else {
                            SuperAppManager.Flash.success('New buseiness saved --> ' + model.get('businessName'));
                            SuperAppManager.trigger("business:show", model.get('_id'));
                            //SuperAppManager.dialogRegion.closeDialog();
                        }
                    },

                    error: function () {
                        console.log('Failed to save business');
                    }
                });


            });


            SuperAppManager.mainRegion.show(businessView);


        }


    }
});