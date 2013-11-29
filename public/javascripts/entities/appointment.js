SuperAppManager.module('Entities', function (Entities, SuperAppManager, Backbone, Marionette, $, _) {

    Entities.CalendarModel = Backbone.Model.extend({

    });

    Entities.Appointment = Backbone.Model.extend({
        urlRoot: 'appointments',
        defaults: {
            "businessId": "",
            "appointmentDate": "",
            "userName": "",
            "appointmentStart": "",
            "appointmentDuration": "",
            "appointmentNote": ""
        },

        idAttribute: "_id"
    });

    //Collection with url
    Entities.AppointmentsCollection = Backbone.Collection.extend({
        url: "appointments",
        model: Entities.Appointment,
        comparator: "appointmentStart"
    });


    //SuperAppManager.request("appointment:entitiesForBusiness", businessId);

    var API = {
        getAppointmentsEntitiesForBusiness: function (scenario, businessId, selectedDate) {

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

                case 1: //querry all appointments for a specific business irrespective of date
                {

                }
                    break;

                case 2: //querry all appointments for a specific business and specific date
                {
                    var search_params = {
                        businessId: businessId,
                        selectedDate: selectedDate
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
                            "userName": "depak", //deepak
                            "appointmentStart": "08:00",
                            "appointmentDuration": "01:00"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "userName": "free", //deepak
                            "appointmentStart": "09:00",
                            "appointmentDuration": "01:00"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "userName": "free", //deepak
                            "appointmentStart": "10:00",
                            "appointmentDuration": "01:00"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "userName": "chidu", //deepak
                            "appointmentStart": "11:00",
                            "appointmentDuration": "01:00"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "userName": "Patrick", //deepak
                            "appointmentStart": "12:00",
                            "appointmentDuration": "01:00"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "userName": "Lunch", //deepak
                            "appointmentStart": "13:00",
                            "appointmentDuration": "01:00"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "userName": "free", //deepak
                            "appointmentStart": "14:00",
                            "appointmentDuration": "01:00"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "userName": "depak", //deepak
                            "appointmentStart": "15:00",
                            "appointmentDuration": "01:00"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "userName": "free", //deepak
                            "appointmentStart": "16:00",
                            "appointmentDuration": "01:00"
                        },
                        {
                            "businessId": "52604e93d40340638c5e4b47", //GlobalS pa
                            "appointmentDate": "20111123",
                            "userName": "depak", //deepak
                            "appointmentStart": "17:00",
                            "appointmentDuration": "01:00"
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


        }
    };

    //SuperAppManager.request("appointment:entitiesForBusiness", businessId);
    SuperAppManager.reqres.setHandler("appointment:entitiesForBusiness", function (scenario, businessId, date) {
        return API.getAppointmentsEntitiesForBusiness(scenario, businessId, date);
    });


});