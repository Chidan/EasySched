SuperAppManager.module('AdminAppointmentApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _, moment) {

    List.Controller = {

        listAdminAppointments: function (appointmentStatus) {

            //Initializing layout
            var adminAppointmentsListLayout = new List.Layout();
            //Initializing header Panel - which contains select option for admin appointments maintenance
            //var model = new SuperAppManager.Entities.CalendarModel({ businessId: businessId });
            var adminPanelView = new List.AdminPanelView();


            //adding loading view
            var loadingView = new SuperAppManager.Common.Views.Loading({
                title: "Data Loading for all Appointments",
                message: "Data loading artificially delayed from server"
            });
            SuperAppManager.mainRegion.show(loadingView);
            //**********************************************************************
            //Start of - Event Handling on AdminPanelView
            //**********************************************************************
            adminPanelView.on("appointments:manage", function () {
                SuperAppManager.trigger("appointments:maintain");
            });

            adminPanelView.on("appointments:pending", function () {
                //Trigger global event
                SuperAppManager.trigger('appointments:status', "pending");
            });

            adminPanelView.on("appointments:approved", function () {
                //Trigger global event
                SuperAppManager.trigger('appointments:status', "approved");
            });

            adminPanelView.on("appointments:autoApproved", function () {
                //Trigger global event
                SuperAppManager.trigger('appointments:status', "auto approved");
            });

            adminPanelView.on("appointments:rejected", function () {
                //Trigger global event
                SuperAppManager.trigger('appointments:status', "rejected");
            });


            adminPanelView.on("userStatus:maintain", function () {
                SuperAppManager.trigger('userStatus:maintain', adminAppointmentsListLayout);
            });

            adminPanelView.on("timeOff:maintain", function () {
                console.log(('timeOff:maintain triggered'));

                SuperAppManager.trigger('timeOff:maintain', adminAppointmentsListLayout);
            });

            adminPanelView.on("appointments:create", function () {
                console.log("appointments:create triggered");

                var tomorrowsDate = moment().add('d', 1).format("YYYY-MM-DD");
                SuperAppManager.trigger("appointments:show", SuperAppManager.loggedInUser.get("_id"), tomorrowsDate);
            });

            adminPanelView.on("serviceTypeProvider:create", function () {
                console.log("serviceTypeProvider:create triggered");

                SuperAppManager.trigger('serviceTypeProvider:create', adminAppointmentsListLayout);
            });

            adminPanelView.on('calendar:view', function() {
                alert('This feature is still under construction');
            });

            adminPanelView.on('notification: manage', function() {
                alert('This feature is still under construction');
            });

            adminPanelView.on('calendar: export', function() {
                alert('This feature is still under construction');
            });

            adminPanelView.on('appointmentsIn:day', function () {
                alert('Day clicked');
            });

            adminPanelView.on('appointmentsIn:week', function () {
                alert('Week clicked');
            });

            adminPanelView.on('appointmentsIn:month', function () {
                alert('Month clicked');
            });


            //**********************************************************************
            //End of - Event Handling on AdminPanelView
            //**********************************************************************


            //fetching all appointments corresponding to given scenario, businessID and tomorrowsDate
            var scenario = 1,
                selectedDate; //Passing empty selected date, which means we will ask server to fetch all appointments
            //in pending status from today
            if (appointmentStatus == "")
                appointmentStatus = 'pending';

            //Instantiating our collection
            var fetchingAppointments =
                SuperAppManager.request("appointment:entitiesForBusiness", scenario, SuperAppManager.loggedInUser.get("_id"), selectedDate, appointmentStatus);

            $.when(fetchingAppointments).done(function (appointments) {
                if (appointments != undefined)

                //Instantiating view, this will also render our collection
                    adminAppointmentsListView = new List.AdminAppointmentsColelctionView({  collection: appointments});

                //**********************************************************************
                //Start of - Event Handling on AdminAppointmentListView
                //**********************************************************************

                adminAppointmentsListView.on("itemview:appointment:show", function (childView, model) {
                    console.log("appointment:show");
                    //trigger event on SuperAppManager application so any one in the whole application can listen
                    SuperAppManager.trigger("appointment:show", model);
                });

                adminAppointmentsListView.on("itemview:user:trust", function (childView, model) {

                    var data = {};
                    data['businessId'] = model.get('businessId');
                    data['customerUserName'] = model.get('username');

                    $.ajax({
                        type: "POST",
                        url: '/appointment/trustUser',
                        data: data,
                        dataType: "json",
                        cache: false,
                        success: function (data) {
                            model.save({appointmentStatus: "auto approved"}, {
                                success: function (model, response) {
                                    childView.render();
                                    childView.flash("success");
                                },
                                error: function () {
                                    SuperAppManager.Flash.error("Appointment update failed");
                                }
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert('error ' + textStatus + " " + errorThrown);
                        }
                    });
                    //trigger event on SuperAppManager application so any one in the whole application can listen
                    SuperAppManager.trigger("user:trust", model);
                });

                adminAppointmentsListView.on("itemview:appointment:approve", function (childView, model) {
                    //model.set({appointmentStatus: "approved"});
                    model.save({appointmentStatus: "approved"}, {
                        success: function (model, response) {
                            childView.render();
                            childView.flash("success");
                        },
                        error: function () {
                            console.log("Appointment update failed");
                        }
                    });
                    //trigger event on SuperAppManager application so any one in the whole application can listen
                    SuperAppManager.trigger("appointment:approve", model);
                });

                adminAppointmentsListView.on("itemview:appointment:reject", function (childView, model) {
                    model.save({appointmentStatus: "rejected"}, {
                        success: function (model, response) {
                            childView.render();
                            childView.flash("danger");
                        },
                        error: function () {
                            console.log("Appointment update failed");
                        }
                    });
                    //trigger event on SuperAppManager application so any one in the whole application can listen
                    SuperAppManager.trigger("appointment:reject", model);
                });
                //**********************************************************************
                //End of - Event Handling on AdminAppointmentListView
                //**********************************************************************


                adminAppointmentsListLayout.on("show", function () {
                    adminAppointmentsListLayout.adminPanelRegion.show(adminPanelView);
                    adminAppointmentsListLayout.adminAppointmentsRegion.show(adminAppointmentsListView);
                });

                SuperAppManager.mainRegion.show(adminAppointmentsListLayout);

            });
        }
    };

}, moment);

