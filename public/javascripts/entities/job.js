SuperAppManager.module('Entities', function (Entities, SuperAppManager, Backbone, Marionette, $, _) {
    //Model with base url Root
    Entities.job = Backbone.Model.extend({
        urlRoot: "jobs",

        //defaults are provided so that if no data is fetched then it doesn't give an error on template while rendering
        defaults: {
            jobTitle: '',
            category: '',
            description: ''
        },

        idAttribute: "_id",

        //Validating the input from user before saving the data into db
        validate: function (attrs, options) {
            var errors = {}
            if (!attrs.jobTitle) {
                errors.jobTitle = "can't be blank";
            }
            if (!attrs.category) {
                errors.category = "can't be blank";
            }
            if (!attrs.description) {
                errors.description = "can't be blank";
            }
            else {
                if (attrs.description.length < 10) {
                    errors.description = "is too short";
                }
            }
            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    });


    //Collection with url
    Entities.jobCollection = Backbone.Collection.extend({
        url: "jobs",
        model: Entities.job,
        comparator: "jobTitle"
    });

    //Initializing not needed as we always fetch data from db
   /* var initializeContacts = function () {
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
    };*/

    //Defining the API which exposes our data from the db
    var API = {
        getJobEntities: function () {
            var jobs = new Entities.jobCollection();
            //defining Deferred object to return the promise once data is available
            var defer = $.Deferred();
            //sending AJAX request to /jobs to get all jobs
            jobs.fetch({
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (data) {
                    defer.resolve(undefined);
                }
            });

            //lookup common.js for more on this part
            //returning promise of Deferred object which will get the data
            return defer.promise();
        },

        getJobEntity: function (jobId) {
            var job = new Entities.job({_id: jobId});
            var defer = $.Deferred();

            job.fetch({
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
//SuperAppManager.request("job:entities");
    SuperAppManager.reqres.setHandler("job:entities", function () {
        return API.getJobEntities();
    });

//SuperAppManager.request("job:entity");
    SuperAppManager.reqres.setHandler("job:entity", function (_id) {
        return API.getJobEntity(_id);
    });

});




