SuperAppManager.module('Entities', function (Entities, SuperAppManager, Backbone, Marionette, $, _) {
    //Model
    Entities.Contact = Backbone.Model.extend({
        urlRoot: "contacts",

        defaults: {
            firstName: '',
            lastName: '',
            phoneNumber: ''
        },

        idAttribute: "_id",

        validate: function (attrs, options) {
            var errors = {}
            if (!attrs.firstName) {
                errors.firstName = "can't be blank";
            }
            if (!attrs.lastName) {
                errors.lastName = "can't be blank";
            }
            else {
                if (attrs.lastName.length < 2) {
                    errors.lastName = "is too short";
                }
            }
            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    });
    //Collection
    Entities.ContactCollection = Backbone.Collection.extend({
        url: "contacts",
        model: Entities.Contact,
        comparator: "firstName"
    });

    //Initializing collection
    var initializeContacts = function () {
        var contacts = new Entities.ContactCollection([
            { _id: 1, firstName: 'Alice', lastName: 'Arten',
                phoneNumber: '555-0184' },
            { _id: 2, firstName: 'Bob', lastName: 'Brigham',
                phoneNumber: '555-0163' },
            { _id: 3, firstName: 'Charlie', lastName: 'Campbell',
                phoneNumber: '555-0129' }
        ]);
        contacts.forEach(function (contact) {
            contact.save();
        });
        return contacts;
    };

    var API = {
        getContactEntities: function () {
            var contacts = new Entities.ContactCollection();
            var defer = $.Deferred();
            contacts.fetch({
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (data) {
                    defer.resolve(undefined);
                }
            });

            //contacts.on('sync', function () {
            //look, the 'sync' event has fired meaning the data is actually here now!
            //console.log(contacts);
            //});
            if (contacts.length === 0) {
                // if we don't have any contacts yet, create some for convenience
                //return initializeContacts();
            }
            //return contacts;
            return defer.promise();
        },

        getContactEntity: function (contactId) {
            var contact = new Entities.Contact({_id: contactId});
            var defer = $.Deferred();

            contact.fetch({
                success: function (data) {
                    defer.resolve(data);
                },

                error: function (data) {
                    defer.resolve(undefined);
                }
            });

            return defer.promise();
        }
    };
//SuperAppManager.request("contact:entities");
    SuperAppManager.reqres.setHandler("contact:entities", function () {
        return API.getContactEntities();
    });

//SuperAppManager.request("contact:entity");
    SuperAppManager.reqres.setHandler("contact:entity", function (_id) {
        return API.getContactEntity(_id);
    });

});




