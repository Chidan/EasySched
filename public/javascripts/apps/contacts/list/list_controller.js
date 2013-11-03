SuperAppManager.module('ContactsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _) {
        List.Controller = {
            //If criterion provided, we need to filter our contact collection, and display the criterion in the filtering input field in our view:
            listContacts: function (criterion) {
                var loadingView = new SuperAppManager.Common.Views.Loading({
                    title: "Data Loading for all users",
                    message: "Data loading artificially delayed from server"
                });
                SuperAppManager.mainRegion.show(loadingView);

                var contactsListLayout = new List.Layout();
                var contactsListPanel = new List.Panel();

                //fetching all contacts from db
                var fetchingContacts = SuperAppManager.request("contact:entities");
                $.when(fetchingContacts).done(function (contacts) {
                        if (contacts !== undefined) {

                            //creating collection of filtered contacts
                            var filteredContacts = SuperAppManager.Entities.FilteredCollection({
                                collection: contacts,

                                filterFunction: function (filterCriterion) {
                                    var criterion = filterCriterion.toLowerCase();
                                    return function (contact) {
                                        if (contact.get('firstName').toLowerCase().indexOf(criterion) !== -1
                                            || contact.get('lastName').toLowerCase().indexOf(criterion) !== -1
                                            || contact.get('phoneNumber').toLowerCase().indexOf(criterion) !== -1) {
                                            return contact;
                                        }
                                    };
                                }
                            });

                            if (criterion) {
                                filteredContacts.filter(criterion);
                                contactsListPanel.once("show", function () {
                                    contactsListPanel.triggerMethod("set:filter:criterion", criterion);
                                });
                            }

                            //Instantiating view, this will also render our collection
                            contactsListView = new List.Contacts({  collection: filteredContacts});

                            contactsListLayout.on("show", function () {
                                //Add create button view to panelRegion of Layout
                                contactsListLayout.panelRegion.show(contactsListPanel);
                                //Add contactsListView to contactsRegion of Layout and finall show contactsListLayout at the bottom
                                contactsListLayout.contactsRegion.show(contactsListView);
                            });

                            //Listening to contacts:filter event
                            contactsListPanel.on("contacts:filter", function (filterCriterion) {
                                filteredContacts.filter(filterCriterion);
                                SuperAppManager.trigger("contacts:filter", filterCriterion);
                            });

                            //Listening to event of new contact
                            contactsListPanel.on("contact:new", function () {

                                var newContact = new SuperAppManager.Entities.Contact();
                                var view = new SuperAppManager.ContactsApp.New.Contact({
                                    model: newContact
                                });

                                SuperAppManager.dialogRegion.show(view);

                                view.on("form:submit", function (data) {

                                    if (newContact.save(data)) {
                                        contacts.add(newContact);
                                        //triggering "dialog:close" which will be handled in dialog region instead of calling "SuperAppManager.dialogRegion.close();"
                                        view.trigger("dialog:close");
                                        //SuperAppManager.dialogRegion.close();
                                        // contacts.reset();
                                        var newContactView = contactsListView.children.findByModel(newContact);

                                        // check whether the new contact view is displayed (it could be
                                        // invisible due to the current filter criterion)
                                        if (newContactView) {
                                            newContactView.flash("success");
                                        }
                                    }
                                    else {
                                        view.triggerMethod("form:data:invalid",
                                            newContact.validationError);
                                    }
                                });
                            });

                            //responding to DELETE button
                            //listening to events from item view in file list_view, and hence the convention --> itemview:contact:delete
                            contactsListView.on("itemview:contact:delete", function (childView, model) {
                                //contacts.remove(model);
                                model.destroy()
                            });
                            //responding to SHOW button
                            contactsListView.on("itemview:contact:show", function (childView, model) {
                                //trigger event on SuperAppManager application so any one in the whole application can listen
                                SuperAppManager.trigger("contact:show", model.get('_id'));
                            });
                            //responding to edit button
                            contactsListView.on("itemview:contact:edit", function (childView, model) {
                                var view = new SuperAppManager.ContactsApp.Edit.Contact({
                                    model: model
                                });

                                view.on("form:submit", function (data) {
                                    
                                    if (model.save(data)) {
                                        childView.render();
                                        view.trigger("dialog:close");
                                        //SuperAppManager.dialogRegion.close();
                                        childView.flash("success");
                                    }
                                    else {
                                        //triggering method "onFormDataInvalid" with property of model - "validation error"
                                        view.triggerMethod("form:data:invalid", model.validationError);
                                    }
                                });


                                SuperAppManager.dialogRegion.show(view);
                            });
                            SuperAppManager.mainRegion.show(contactsListLayout);
                        }
                    }
                )
                ;


            }
        }
    }
)
;

