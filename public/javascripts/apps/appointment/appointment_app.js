SuperAppManager.module('AppointmentsApp', function (AppointmentsApp, SuperAppManager, Backbone, Marionette, $, _) {

   AppointmentsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "appointments": "showAppointments",
            "bookAppointment": "showBookAppointment"
        }
    });


    var API = {
        showAppointments: function (businessId, selectedDate) {
            //SuperAppManager.AppointmentsApp.List.Controller.listAppointments(id)
            SuperAppManager.AppointmentsApp.List.Controller.listAppointments(businessId, selectedDate);
        },

        showBookAppointment: function (newAppointment) {
            SuperAppManager.AppointmentsApp.Book.Controller.showBookAppointment(newAppointment);
        }
    };

    SuperAppManager.on("book:appointment", function (newAppointment) {
        //only impacting the URL in the address bar
        //SuperAppManager.navigate("business/" + id);
        //actually redirecting page to display correct contect
        API.showBookAppointment(newAppointment);
    });

    SuperAppManager.on("appointments:show", function (businessId, selectedDate) {
        console.log("appointments:show triggered");
        API.showAppointments(businessId, selectedDate);

    });


    SuperAppManager.addInitializer(function () {
        new AppointmentsApp.Router({
            controller: API
        });
    });



});