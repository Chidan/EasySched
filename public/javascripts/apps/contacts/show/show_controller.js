SuperAppManager.module('ContactsApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showContact: function (id) {
            var loadingView = new SuperAppManager.Common.Views.Loading({
                title: "Data Loading for single user",
                message: "Data loading artificially delayed from server"
            });
            SuperAppManager.mainRegion.show(loadingView);
            var fetchingContact = SuperAppManager.request("contact:entity", id);
            $.when(fetchingContact).done(function (contact) {
                var contactView;
                if (contact !== undefined) {
                    contactView = new Show.Contact({
                        model: contact
                    });
                    console.log(contact);

                    contactView.on("contact:edit", function (contact) {
                        SuperAppManager.trigger("contact:edit", contact.get('_id'));
                    });
                }
                else {
                    contactView = new Show.MissingContact();
                }

                SuperAppManager.mainRegion.show(contactView);
            });
        }
    }
});




