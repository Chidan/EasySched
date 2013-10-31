ContactManager.module('ContactsApp.Edit', function (Edit, ContactManager, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editContact: function (id) {
            var loadingView = new ContactManager.Common.Views.Loading({
                title: "Editing contact",
                message: "Data loading is delayed to demonstrate using a loading view."
            });
            ContactManager.mainRegion.show(loadingView);

            var fetchingContact = ContactManager.request("contact:entity", id);
            $.when(fetchingContact).done(function (contact) {

                    var view;
                    if (contact !== undefined) {
                        view = new Edit.Contact({
                            model: contact,
                            generateTitle: true
                        });

                        view.on("form:submit", function (data) {

                            console.log("save clicked");
                            //this.model.set(data);

                            /* -- validating form data moved to common form in view.js
                             if (contact.validationError) {
                             view.triggerMethod("form:data:invalid", contact.validationError);
                             }
                             else {

                             this.model.sync('update', contact, {
                             success: function () {
                             ContactManager.trigger("contact:show", contact.get('_id'));
                             },
                             error: function () {
                             alert("error during saving");
                             }
                             });
                             }*/

                            if (contact.save(data)) {
                                console.log('reporting contact ' + contact);
                                console.log(contact.get('_id') + ' ' + contact.get('firstName') + ' ' + contact.get('lasttName'));

                                ContactManager.trigger("contact:show", contact.get('_id'));

                            }
                            else {
                                //triggering method "onFormDataInvalid" with property of model - "validation error"
                                view.triggerMethod("form:data:invalid", contact.validationError);
                            }
                        });
                    }
                    else {
                        view = new ContactManager.ContactsApp.Show.MissingContact();
                    }

                    ContactManager.mainRegion.show(view);
                }
            );
        }
    };
});
