SuperAppManager.module('AboutApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Message = Marionette.ItemView.extend({
        template: "#about-message"
    });
});