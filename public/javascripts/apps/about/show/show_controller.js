SuperAppManager.module('AboutApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showAbout: function () {
            var view = new Show.Message();
            SuperAppManager.mainRegion.show(view);
        }
    };
});