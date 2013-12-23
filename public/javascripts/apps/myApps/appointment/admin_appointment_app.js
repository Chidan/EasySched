SuperAppManager.module('AdminAppointmentApp', function (AdminAppointmentApp, SuperAppManager, Backbone, Marionette, $, _, moment) {

    AdminAppointmentApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "adminAppointments": "showAppointments",
            "maintainUserStatus": "userStatusMaintain"
        }
    });


    var API = {
        showAppointments: function (appointmentStatus) {
            AdminAppointmentApp.List.Controller.listAdminAppointments(appointmentStatus);
        },

        userStatusMaintain: function (adminAppointmentsListLayout) {
            AdminAppointmentApp.TrustedUser.Controller.listTrustedUser(adminAppointmentsListLayout);
        }

    };

    SuperAppManager.on("appointments:maintain", function () {
        SuperAppManager.navigate("adminAppointments");
        var appointmentStatus = 'pending';
        API.showAppointments(appointmentStatus);
    });

    SuperAppManager.on("appointments:status", function (appointmentStatus) {
        API.showAppointments(appointmentStatus);
    });

    SuperAppManager.on('userStatus:maintain', function(adminAppointmentsListLayout) {
        SuperAppManager.navigate("maintainUserStatus");
        API.userStatusMaintain(adminAppointmentsListLayout);
    });

    SuperAppManager.addInitializer(function () {
        new AdminAppointmentApp.Router({
            controller: API
        });
    });

}, moment);