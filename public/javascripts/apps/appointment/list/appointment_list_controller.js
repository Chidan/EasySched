SuperAppManager.module('AppointmentsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _, moment) {

    List.Controller = {

        listAppointments: function (businessId, selectedDate) {

            //Initializing layout
            var appointmentsListLayout = new List.Layout();
            //Initializing Top Panel - which contains "button for new business" & "input field for filter criterion"
            var model = new SuperAppManager.Entities.CalendarModel({ businessId: businessId });
            var calendarPanelView = new List.CalendarPanelView({ model: model });


            //adding loading view
            var loadingView = new SuperAppManager.Common.Views.Loading({
                title: "Data Loading for all Businesses",
                message: "Data loading artificially delayed from server"
            });
            SuperAppManager.mainRegion.show(loadingView);


            calendarPanelView.on("Appointment:show", function (businessId, selectedDate) {
                SuperAppManager.trigger("appointments:show", businessId, selectedDate);
            });


            //fetching all appointments corresponding to given scenario, businessID and tomorrowsDate
            var scenario = 2;

            //Instantiating our collection

            var fetchingAppointments =
                SuperAppManager.request("appointment:entitiesForBusiness", scenario, businessId, selectedDate);

            $.when(fetchingAppointments).done(function (appointments) {
                if (appointments != undefined)
                    console.log(appointments);

                //Starting logic for appointments table
                if (appointments.length !== 0) {
                    var appointment;
                    for (var i = 0; i < 10; i++) {

                        var hour = moment().minute(0).hour(i + 8).format('HH:mm');

                        if (typeof appointments.models[i] == 'undefined') {
                            appointment = {
                                "businessId": businessId,
                                "appointmentDate": selectedDate,
                                "userName": "free",
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
                                    "appointmentDate": selectedDate,
                                    "userName": "free",
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
                            "appointmentDate": selectedDate,
                            "userName": "free",
                            "appointmentStart": moment().minute(0).hour(i + 8).format('HH:mm'),
                            "appointmentDuration": moment().minute(0).hour(1).format('HH:mm'),
                            "appointmentNote": ""
                        };

                        appointments.add(appointment);
                    }
                }
                //Ending logic for appointments table

                console.log(appointments);

                //Instantiating view, this will also render our collection
                appointmentsListView = new List.AppointmentsColelctionView({  collection: appointments});


                //responding to Book button on ItemView
                appointmentsListView.on("itemview:book:appointment", function (childView, model) {
                    //trigger event on SuperAppManager application so any one in the whole application can listen
                    console.log(model);
                    SuperAppManager.trigger("book:appointment", model);
                });


                //Adding Business top Panel and listBusiness to layout
                appointmentsListLayout.on("show", function () {
                    //Add top panel to panelRegion of Layout
                    appointmentsListLayout.calendarRegion.show(calendarPanelView);
                    //Add businessListView to businessRegion of Layout and finally add businessListLayout to the mainRegion
                    appointmentsListLayout.appointmentsRegion.show(appointmentsListView);
                });

                SuperAppManager.mainRegion.show(appointmentsListLayout);

            });
        }
    };

}, moment);