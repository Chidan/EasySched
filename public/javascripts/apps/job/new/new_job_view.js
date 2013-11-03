SuperAppManager.module('JobsApp.New', function (New, SuperAppManager, Backbone, Marionette, $, _) {
    New.job = Marionette.ItemView.extend({
        template: "#job-form",

        events: {
            'click button.js-submit': 'submitClicked'
        },

        submitClicked: function (e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        }

    });




});






