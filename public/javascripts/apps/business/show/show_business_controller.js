SuperAppManager.module('BusinessApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showBusiness: function (id) {
            var loadingView = new SuperAppManager.Common.Views.Loading({
                title: "Data Loading for business",
                message: "Data loading artificially delayed from server"
            });
            SuperAppManager.mainRegion.show(loadingView);
            var fetchingContact = SuperAppManager.request("business:entity", id);
            $.when(fetchingContact).done(function (business) {
                var businessView;
                if (business !== undefined) {
                    console.log(business);
                    businessView = new Show.Business({
                        model: business
                    });
                }
                else {
                    businessView = new Show.Missingbusiness();
                }

                SuperAppManager.mainRegion.show(businessView);
            });
        }
    }
});




