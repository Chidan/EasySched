SuperAppManager.module('AppointmentsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _, businessStartmoment) {

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
                        var testOnce = showSortedAppointments1(appointments, selectedDate);
                        console.log(testOnce);

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

            //-----------------------
            calendarPanelView.on('datePicker:initialize', function () {

                var self = this;
                var currentDate = moment().add('d', 1).format("YYYY-MM-DD");
                //var myDate = new Date();
                //var prettyDate = (myDate.getMonth() + 1) + '/' + (myDate.getDate() + 1 ) + '/' + myDate.getFullYear();
                //displaying the required dates
                //-----------------------------------------


                function getHolidays() {
                    var defer = $.Deferred();
                    var holidaysArray = [];
                    holidays =
                        $.ajax({
                            type: 'GET',
                            url: '/getTimeOffDates',
                            data: 'businessId=' + businessId
                        });

                    $.when(holidays).done(function (data) {
                        console.log(data);


                        for (i = 0; i < data.length; i++) {
                            holidaysArray[i] = data[i].timeOffDate;
                        }
                        defer.resolve(holidaysArray);
                    });
                    return defer.promise();
                }

                var markedHolidays = getHolidays();

                $.when(markedHolidays).done(function (holidays) {
                    unavailableDates = holidays;
                    // Holiday List
                    //var unavailableDates = ["2014-01-15", "2014-01-16"];
                    // Exeptions if some Weekends are Working days
                    var enableDay = ["2014-01-19", "2014-01-26"];

                    // Weekend Days Sunday = 0 ... Sat =6
                    var weekend = [0, 6];

                    function nationalDays(date) {
                        dmy = moment(date).format("YYYY-MM-DD");

                        // if Holiday then block it
                        if ($.inArray(dmy, unavailableDates) > -1) {
                            return [false, "", "Its a Holiday"];
                        }
                        // if Exception then Enable it
                        if ($.inArray(dmy, enableDay) > -1) {
                            return [true, ""];
                        }
                        //if Weekend then block it
                        if ($.inArray(date.getDay(), weekend) > -1) {
                            return [false, "", "Its a Holiday"];
                        }
                        return [true, ""];
                    }

                    self.$("#datepicker").datepicker({
                        minDate: 0,
                        maxDate: +365,
                        dateFormat: 'yyyy mm dd',
                        beforeShowDay: nationalDays
                    }).val(currentDate);

                    self.model.set({ appointmentDate: currentDate});
                });
            });
            //----------------------

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


            //test code goes here
            var businessStart = moment().minute(30).hour(8).format('HH:mm');
            var splity = businessStart.split(":", 2);
            var businessStartHourNumber = splity[0];
            var businessStartMinuteNumber = splity[1];
            var businessStartNumber = ( businessStartHourNumber * 4 ) + ( businessStartMinuteNumber / 15 );

            var businessEnd = moment().minute(30).hour(17).format('HH:mm');
            splity = businessEnd.split(":", 2);
            var businessEndHourNumber = splity[0];
            var businessEndMinuteNumber = splity[1];
            var businessEndNumber = ( businessEndHourNumber * 4 ) + ( businessEndMinuteNumber / 15 );

            var serviceTimeNumber = 2;

            var convertTimeToNumber = function (time) {
                var splity = time.split(":", 2);
                return(( splity[0] * 4 ) + ( splity[1] / 15 ));
            };

            var showSortedAppointments1 = function (appointments, appointmentDate) {
                var appointy = new SuperAppManager.Entities.AppointmentsCollection();

                if (appointments != undefined) {
                    if (appointments.length !== 0) {

                        for (j = 0; j < appointments.length; j++) {
                            i = businessStartNumber;
                            while ( i < businessEndNumber ) {
                                if (i + serviceTimeNumber > convertTimeToNumber(appointments.models[j].attributes.appointmentStart)) {
                                    businessStartNumber = convertTimeToNumber(appointments.models[j].attributes.appointmentStart) +
                                        convertTimeToNumber(appointments.models[j].attributes.appointmentDuration);
                                    break;
                                }

                                appointment = {
                                    "businessId": businessId,
                                    "appointmentDate": appointmentDate,
                                    "username": "free",
                                    "serviceType": serviceTypePanelCollectionView.$("option:selected").val(),
                                    "serviceProvider": serviceProviderPanelCollectionView.$("option:selected").val(),
                                    "appointmentStart": moment().minute((i % 4) * 15).hour(i / 4).format('HH:mm'),
                                    "appointmentDuration": moment().minute((i % 4) * 15).hour(i / 4).format('HH:mm'),
                                    "appointmentNote": ""
                                };
                                appointy.add(appointment);
                                i= i+ serviceTimeNumber;
                            }
                        }
                    }

                    if (appointments.length == 0) {

                        var counter = ( businessEndNumber - businessStartNumber ) / serviceTimeNumber;


                        for (var i = 0; i < counter; i++) {
                            appointment = {
                                "businessId": businessId,
                                "appointmentDate": appointmentDate,
                                "username": "free",
                                "serviceType": serviceTypePanelCollectionView.$("option:selected").val(),
                                "serviceProvider": serviceProviderPanelCollectionView.$("option:selected").val(),
                                "appointmentStart": moment().minute((businessStartNumber % 4) * 15).hour(businessStartNumber / 4).format('HH:mm'),
                                "appointmentDuration": moment().minute((serviceTimeNumber % 4) * 15).hour(serviceTimeNumber / 4).format('HH:mm'),
                                "appointmentNote": ""
                            };
                            appointy.add(appointment);
                            businessStartNumber = businessStartNumber + serviceTimeNumber;
                        }
                    }
                }

                return appointy;
            };

            //test code goes here


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