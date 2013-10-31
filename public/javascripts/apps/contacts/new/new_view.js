ContactManager.module('ContactsApp.New', function (New, ContactManager, Backbone, Marionette, $, _) {
    New.Contact = ContactManager.Common.Views.Form.extend({
        title: "New Contact",

        onRender: function () {
            this.$(".js-submit").text("Create contact");
        }
    });
});