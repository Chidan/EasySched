SuperAppManager.module('AppointmentsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _, moment) {

    List.Controller = {

        listAppointments: function (businessId, selectedDate) {

            //Initializing layout
            var appointmentsListLayout = new List.Layout();
            //Initializing Top Panel - which contains Calendar for date selection
            var calendarModel = new SuperAppManager.Entities.CalendarModel({ businessId: businessId });
            calendarPanelView = new List.CalendarPanelView({ model: calendarModel });


            var fetchingServiceTypes =
                SuperAppManager.request("businessServiceTypeProvider:serviceTypes", businessId, "serviceTypes", null);

            $.when(fetchingServiceTypes).done(function (serviceTypes) {
                serviceTypePanelCollectionView = new List.ServiceTypePanelCollectionView({ collection: serviceTypes });

                var firstServiceType = serviceTypes.first().get('serviceType');
                var firstServiceProvider = serviceTypes.first().get('serviceProvider');

                appointmentsListLayout.serviceTypeRegion.show(serviceTypePanelCollectionView);
                appointmentsListLayout.calendarRegion.show(calendarPanelView);

                var fetchingServiceProviders =
                    SuperAppManager.request("businessServiceTypeProvider:serviceTypes", businessId,
                        "serviceProviders", firstServiceType);
                $.when(fetchingServiceProviders).done(function (serviceProviders) {
                    serviceProviderPanelCollectionView = new List.ServiceProviderPanelCollectionView({ collection: serviceProviders });

                    appointmentsListLayout.serviceProviderRegion.show(serviceProviderPanelCollectionView);


                    //fetching all appointments corresponding to given scenario, businessID and tomorrowsDate
                    var scenario = 2,
                        appointmentStatus;

                    //Instantiating our collection
                    var fetchingAppointments =
                        SuperAppManager.request("appointment:entitiesForBusiness", scenario,
                            businessId, selectedDate, appointmentStatus, firstServiceType, firstServiceProvider);

                    $.when(fetchingAppointments).done(function (appointments) {
                        showSortedAppointments(appointments, selectedDate);
                    });


                    serviceProviderPanelCollectionView.on('serviceProvider:selected', function () {
                        SuperAppManager.trigger('appointments:refresh');
                    });

                });

                serviceTypePanelCollectionView.on('serviceType:selected', function () {

                    var fetchingServiceProviders =
                        SuperAppManager.request("businessServiceTypeProvider:serviceTypes", businessId,
                            "serviceProviders", serviceTypePanelCollectionView.$("option:selected").val());
                    $.when(fetchingServiceProviders).done(function (serviceProviders) {
                        serviceProviderPanelCollectionView = new List.ServiceProviderPanelCollectionView({ collection: serviceProviders });

                        appointmentsListLayout.serviceProviderRegion.show(serviceProviderPanelCollectionView);

                        SuperAppManager.trigger('appointments:refresh');
                    });
                });


            });

            calendarPanelView.on("Appointment:show", function () {

                SuperAppManager.trigger('appointments:refresh');
            });


            SuperAppManager.on('appointments:refresh', function () {
                var scenario = 2,
                    appointmentStatus;
                //Instantiating our collection
                var fetchingAppointments =
                    SuperAppManager.request("appointment:entitiesForBusiness", scenario,
                        businessId, calendarPanelView.model.get('appointmentDate'), appointmentStatus,
                        serviceTypePanelCollectionView.$("option:selected").val(),
                        serviceProviderPanelCollectionView.$("option:selected").val());

                $.when(fetchingAppointments).done(function (appointments) {
                    showSortedAppointments(appointments, calendarPanelView.model.get('appointmentDate'));
                });
            });


            var showSortedAppointments = function (appointments, appointmentDate) {
                if (appointments != undefined)
                //Starting logic for appointments table
                    if (appointments.length !== 0) {
                        var appointment;
                        for (var i = 0; i < 10; i++) {

                            var hour = moment().minute(0).hour(i + 8).format('HH:mm');

                            if (typeof appointments.models[i] == 'undefined') {
                                appointment = {
                                    "businessId": businessId,
                                    "appointmentDate": appointmentDate,
                                    "username": "free",
                                    "serviceType": serviceTypePanelCollectionView.$("option:selected").val(),
                                    "serviceProvider": serviceProviderPanelCollectionView.$("option:selected").val(),
                                    "appointmentStart": moment().minute(0).hour(i + 8).format('HH:mm'),
                                    "appointmentDuration": moment().minute(0).hour(1).format('HH:mm'),
                                    "appointmentNote": ""
                                };
                                appointments.add(appointment);
                            }
                            if (typeof appointments.models[i] !== 'undefined') {
                                if (appointments.models[i].attributes.appointmentStart != hour) {
                                    appointment = {
                                        "businessId": businessId,
                                        "appointmentDate": appointmentDate,
                                        "username": "free",
                                        "serviceType": serviceTypePanelCollectionView.$("option:selected").val(),
                                        "serviceProvider": serviceProviderPanelCollectionView.$("option:selected").val(),
                                        "appointmentStart": moment().minute(0).hour(i + 8).format('HH:mm'),
                                        "appointmentDuration": moment().minute(0).hour(1).format('HH:mm'),
                                        "appointmentNote": ""
                                    };
                                    appointments.add(appointment);

                                }
                            }

                        }
                    }

                if (appointments.length == 0) {
                    for (var i = 0; i < 10; i++) {
                        var appointment = {

                            "businessId": businessId,
                            "appointmentDate": appointmentDate,
                            "username": "free",
                            "serviceType": serviceTypePanelCollectionView.$("option:selected").val(),
                            "serviceProvider": serviceProviderPanelCollectionView.$("option:selected").val(),
                            "appointmentStart": moment().minute(0).hour(i + 8).format('HH:mm'),
                            "appointmentDuration": moment().minute(0).hour(1).format('HH:mm'),
                            "appointmentNote": ""
                        };

                        appointments.add(appointment);
                    }
                }
                //Ending logic for appointments table

                //Instantiating view, this will also render our collection
                appointmentsListView = new List.AppointmentsColelctionView({  collection: appointments});

                //responding to Book button on ItemView
                appointmentsListView.on("itemview:book:appointment", function (childView, model) {
                    //trigger event on SuperAppManager application so any one in the whole application can listen
                    SuperAppManager.trigger("book:appointment", model);
                });

                appointmentsListLayout.appointmentsRegion.show(appointmentsListView);
            };

            SuperAppManager.mainRegion.show(appointmentsListLayout);
        }
    };

}, moment);