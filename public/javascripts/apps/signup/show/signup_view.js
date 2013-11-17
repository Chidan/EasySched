//#signup-form
// This will be our signup page.
SuperAppManager.module('SignupApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {

    Show.SignupPanel = Marionette.ItemView.extend({

        template: "#signup-form",


        events: {
            'click button.js-submit': 'signupClicked'
        },

        signupClicked: function (e) {
            //stop the default action of <a> tag and page refresh
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);

            this.trigger("form:submit", data);
        }

    });

});