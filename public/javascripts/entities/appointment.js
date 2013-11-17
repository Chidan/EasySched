SuperAppManager.module('Entities', function (Entities, SuperAppManager, Backbone, Marionette, $, _) {

    Entities.Appointments = Backbone.Model.extend({
        urlRoot: 'appointments',

        defaults: {

        }
    });

    //Collection with url
    Entities.AppointmentsCollection = Backbone.Collection.extend({
        url: "appointments",
        model: Entities.Appointments,
        comparator: ""
    });


    //SuperAppManager.request("appointment:entitiesForBusiness", businessID);

    var API = {
        getAppointmentsEntitiesForBusiness: function (businessId) {



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
        }
    };

    //SuperAppManager.request("appointment:entitiesForBusiness", businessID);
    SuperAppManager.reqres.setHandler("appointment:entitiesForBusiness", function (businessId) {
        return API.getAppointmentsEntitiesForBusiness(businessId);
    });


});