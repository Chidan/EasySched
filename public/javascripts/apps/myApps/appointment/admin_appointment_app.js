SuperAppManager.module('AdminAppointmentApp', function (AdminAppointmentApp, SuperAppManager, Backbone, Marionette, $, _, moment) {

    AdminAppointmentApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "adminAppointments": "showAppointments"
        }
    });


    var API = {
        showAppointments: function (appointmentStatus) {
            AdminAppointmentApp.List.Controller.listAdminAppointments(appointmentStatus);
        }

    };

    SuperAppManager.on("appointments:maintain", function () {
        console.log("appointments:maintain triggered");
        SuperAppManager.navigate("adminAppointments");
        var appointmentStatus = 'pending';
        API.showAppointments(appointmentStatus);
    });

    SuperAppManager.on("appointments:status", function (appointmentStatus) {
        API.showAppointments(appointmentStatus);
    });

    SuperAppManager.addInitializer(function () {
        new AdminAppointmentApp.Router({
            controller: API
        });
    });

}, moment);