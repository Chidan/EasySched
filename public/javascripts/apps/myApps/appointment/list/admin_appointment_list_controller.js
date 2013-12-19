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
                console.log(this.$("option:selected").val());
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
                    console.log("user:trust");
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
                //Start of - Event Handling on AdminAppointmentListView
                //**********************************************************************

                //Adding Business top Panel and listBusiness to layout
                adminAppointmentsListLayout.on("show", function () {
                    //Add top panel to panelRegion of Layout
                    adminAppointmentsListLayout.adminPanelRegion.show(adminPanelView);
                    //Add businessListView to businessRegion of Layout and finally add businessListLayout to the mainRegion
                    adminAppointmentsListLayout.adminAppointmentsRegion.show(adminAppointmentsListView);
                });

                SuperAppManager.mainRegion.show(adminAppointmentsListLayout);

            });
        }
    };

}, moment);

