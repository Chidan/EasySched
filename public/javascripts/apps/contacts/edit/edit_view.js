SuperAppManager.module('ContactsApp.Edit', function (Edit, SuperAppManager, Backbone, Marionette, $, _) {
    Edit.Contact = SuperAppManager.Common.Views.Form.extend({

        initialize: function () {
            this.title = "Editing " + this.model.get('firstName');
            this.title += " " + this.model.get('lastName');
        },

        onRender: function () {
            if (this.options.generateTitle) {
                var $title = $('<h1>', { text: this.title });
                this.$el.prepend($title);
            }
            this.$(".js-submit").text("Update contact");
        }
    });

});