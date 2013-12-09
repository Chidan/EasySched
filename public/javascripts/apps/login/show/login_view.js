//#login-form
// This will be our Login page.
SuperAppManager.module('LoginApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {

    Show.LoginForm = Marionette.ItemView.extend({

        template: "#login-form",

        events: {
            'click button.js-submit': 'loginClicked',
            'click a.js-singup': 'callSignupView'
        },

        loginClicked: function (e) {
            //stop the default action of <a> tag and page refresh
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);

            this.trigger("form:submit", data);
        },

        callSignupView: function (e) {
            e.preventDefault();
            this.trigger("form:signup");
        }


    });

});