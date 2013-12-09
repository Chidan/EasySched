//#business-form
SuperAppManager.module('BusinessApp.New', function (New, SuperAppManager, Backbone, Marionette, $, _) {


    New.BusinessView = Marionette.ItemView.extend({
        template: "#business-form",

        events: {
            'click button.js-submit': 'saveClicked'

        },

        saveClicked: function (e) {
            //stop the default action of <a> tag and page refresh
            e.preventDefault();

            var data = Backbone.Syphon.serialize(this);

            this.trigger("form:submit", data);
        }

    });


});