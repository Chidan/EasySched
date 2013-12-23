SuperAppManager.module('Entities', function (Entities, SuperAppManager, Backbone, Marionette, $, _) {

    Entities.CalendarModel = Backbone.Model.extend({

    });

    Entities.Appointment = Backbone.Model.extend({
        urlRoot: 'appointments',
        defaults: {
            "businessId": "",
            "appointmentDate": "",
            "appointmentStart": "",
            "appointmentDuration": "",
            "appointmentNote": "",
            "appointmentServiceType": "default",  //for example hair-cut, hair wash etc..
            "appointmentStatus": "pending",
            "appointmentServiceProvider": "default",    //Inside business who will provide the service
            "username": ""
        },

        comparator: 'appointmentStart',

        idAttribute: "_id"
    });

    //Collection with url
    Entities.AppointmentsCollection = Backbone.Collection.extend({
        url: "appointments",
        model: Entities.Appointment,
        comparator: "appointmentStart"
    });

    Entities.TrustedUser = Backbone.Model.extend({
        urlRoot: 'userStatus',
        defaults: {
            "businessId": "",
            "businessUserName": "",
            "customerUserName": ""
        },
        idAttribute: "_id"

    });

    Entities.TrustedUsers = Backbone.Collection.extend({
        url: 'userStatus',
        model: Entities.TrustedUser

    });


    var API = {
        getAppointmentsEntitiesForBusiness: function (scenario, businessId, selectedDate, appointmentStatus) {
            //scenario || (scenario = {});
            var appointments = new Entities.AppointmentsCollection();

            var defer = $.Deferred();
            switch (scenario) {
                case 0: //querry all appointments from all business
                {
                    //defining Deferred object to return the promise once data is available

                    //sending AJAX request to /businesss to get all businesss
                    appointments.fetch({
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
                    break;

                case 1: //querry all appointments for a specific business and specific date
                {
                    var search_params = {
                        businessId: businessId,
                        selectedDate: selectedDate,
                        appointmentStatus: appointmentStatus
                    };

                    appointments.fetch({
                        data: $.param(search_params),
                        success: function (data) {
                            defer.resolve(data);
                        },
                        error: function (data) {
                            defer.resolve(undefined);
                        }
                    });

                    return defer.promise();

                }
                    break;

                case 2:
                {

                }
                    break;

                case 3:
                {
                    var App = Backbone.Model.extend({});

                    //Collection with url
                    var AppCollection = Backbone.Collection.extend({
                        model: App
                    });
                    var appointmentsCoded = new AppCollection([
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "depak", //deepak
                            "appointmentStart": "08:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "free", //deepak
                            "appointmentStart": "09:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "free", //deepak
                            "appointmentStart": "10:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "chidu", //deepak
                            "appointmentStart": "11:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "Patrick", //deepak
                            "appointmentStart": "12:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "Lunch", //deepak
                            "appointmentStart": "13:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "free", //deepak
                            "appointmentStart": "14:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "depak", //deepak
                            "appointmentStart": "15:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "free", //deepak
                            "appointmentStart": "16:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "username": "depak", //deepak
                            "appointmentStart": "17:00",
                            "appointmentDuration": "01:00",
                            "appointmentServiceType": "default",
                            "appointmentStatus": "pending"
                        }
                    ]);

                    defer.resolve(appointmentsCoded);
                    return defer.promise();

                }
                    break;

                default:
                {

                }

            }


        },

        getAppointmentsEntitiesAccordingToStatus: function (appointmentStatus) {

        },

        getBusinessTrustedUser: function (businessId) {
            var trustedUsers = new Entities.TrustedUsers();
            var defer = $.Deferred();

            var search_params = {
                businessId: businessId
            };

            trustedUsers.fetch({
                data: $.param(search_params),
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


    SuperAppManager.reqres.setHandler("appointment:entitiesForBusiness", function (scenario, businessId, date, appointmentStatus) {
        return API.getAppointmentsEntitiesForBusiness(scenario, businessId, date, appointmentStatus);
    });

    SuperAppManager.reqres.setHandler("business:trustedUser", function (businessId) {
        return API.getBusinessTrustedUser(businessId);
    });


});