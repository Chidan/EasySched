SuperAppManager.module('ContactsApp.New', function (New, SuperAppManager, Backbone, Marionette, $, _) {
    New.Contact = SuperAppManager.Common.Views.Form.extend({
        title: "New Contact",

        onRender: function () {
            this.$(".js-submit").text("Create contact");
        }
    });
});