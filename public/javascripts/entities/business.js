SuperAppManager.module('Entities', function (Entities, SuperAppManager, Backbone, Marionette, $, _) {
    //Model with base url Root
    Entities.Business = Backbone.Model.extend({
        urlRoot: "business",

        //defaults are provided so that if no data is fetched then it doesn't give an error on template while rendering
        defaults: {
            businessName: '',
            businessCategory: '',
            username: '',
            businessAddress: ''
        },

        idAttribute: "_id",

        /*//Validating the input from user before saving the data into db
        validate: function (attrs, options) {
            var errors = {}
            if (!attrs.businessName) {
                errors.businessName = "can't be blank";
            }
            if (!attrs.businessCategory) {
                errors.businessCategory = "can't be blank";
            }
            if (!attrs.businessAddress) {
                errors.businessAddress = "can't be blank";
            }
            else {
                if (attrs.businessName.length < 10) {
                    errors.businessNam = "is too short";
                }
            }
            if (!_.isEmpty(errors)) {
                return errors;
            }
        }*/
    });


    //Collection with url
    Entities.BusinessCollection = Backbone.Collection.extend({
        url: "business",
        model: Entities.Business,
        comparator: "businessName"
    });


    //Defining the API which exposes our data from the db
    var API = {
        getBusinessEntities: function () {
            var businesses = new Entities.BusinessCollection();
            //defining Deferred object to return the promise once data is available
            var defer = $.Deferred();
            //sending AJAX request to /businesss to get all businesss
            businesses.fetch({
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

        getBusinessEntity: function (businessId) {
            var business = new Entities.Business({_id: businessId});
            var defer = $.Deferred();

            business.fetch({
                success: function (data) {
                    defer.resolve(data);
                },

                error: function (data) {
                    defer.resolve(undefined);
                }
            });

            return defer.promise();
        },

        getBusinessEntityByCategory: function (category) {
            var business = new Entities.BusinessCollection({category: category});

            var defer = $.Deferred();

            business.fetch({
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
//SuperAppManager.request("business:entities");
    SuperAppManager.reqres.setHandler("business:entities", function () {
        return API.getBusinessEntities();
    });

//SuperAppManager.request("business:entity", id);
    SuperAppManager.reqres.setHandler("business:entity", function (_id) {
        return API.getBusinessEntity(_id);
    });

//SuperAppManager.request("business:entityCategory", category);
    SuperAppManager.reqres.setHandler("business:entityCategory", function (category) {
        return API.getBusinessEntityByCategory(category);
    });

});




