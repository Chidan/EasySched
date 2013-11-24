SuperAppManager.module('AppointmentsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _, moment) {


    List.Controller = {

        viewCal: function () {
            var appointmentsView = new List.AppointmentsColelctionView();

            SuperAppManager.mainRegion.show(appointmentsView);
        },

        listAppointments: function (businessModel) {

            //Initializing layout
            var appointmentsListLayout = new List.Layout();
            //Initializing Top Panel - which contains "button for new business" & "input field for filter criterion"
            var calendarPanelView = new List.CalendarPanelView({ model: businessModel });


            //adding loading view
            var loadingView = new SuperAppManager.Common.Views.Loading({
                title: "Data Loading for all Businesses",
                message: "Data loading artificially delayed from server"
            });
            SuperAppManager.mainRegion.show(loadingView);

            calendarPanelView.on("Appointment:show", function (businessModel, selectedDate) {

                selectedDate = moment(selectedDate).format("YYYY-MM-DD");
                console.log(selectedDate);

                //fetching appointments for selected business
                var scenario = 2;
                var businessID = businessModel.get('_id');
                var fetchingAppointments =
                    SuperAppManager.request("appointment:entitiesForBusiness", scenario, businessID, selectedDate, appointments);

                $.when(fetchingAppointments).done(function (appointments) {
                    if (appointments != undefined)
                        console.log(appointments);
                    //our view is now rendered with new date

                });


            });

            //fetching all appointments corresponding to given businessID and tomorrowsDate
            var scenario = 2;
            var tomorrowsDate = moment().add('d', 1).format("YYYY-MM-DD");

            var businessID = businessModel.get('_id');

            var appointments = new SuperAppManager.Entities.AppointmentsCollection();

            var fetchingAppointments =
                SuperAppManager.request("appointment:entitiesForBusiness", scenario, businessID, tomorrowsDate, appointments);

            $.when(fetchingAppointments).done(function (appointments) {
                if (appointments != undefined)
                    console.log(appointments);

                //Instantiating view, this will also render our collection
                appointmentsListView = new List.AppointmentsColelctionView({  collection: appointments});


                //SuperAppManager.mainRegion.show(appointmentsListView);

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