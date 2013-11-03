//Here we build the
//  - class for the a single business view,

SuperAppManager.module('BusinessApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Business = Marionette.ItemView.extend({
        template: "#business-view"

    });

    Show.MissingJob = Marionette.ItemView.extend({
        template: "#missing-business-view"
    });

});