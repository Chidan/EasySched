SuperAppManager.module('AdminAppointmentApp', function (AdminAppointmentApp, SuperAppManager, Backbone, Marionette, $, _, moment) {

    AdminAppointmentApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "adminAppointments": "showAppointments",
            "maintainUserStatus": "userStatusMaintain",
            "maintainTimeOff": "timeOffMaintain"
        }
    });


    var API = {
        showAppointments: function (appointmentStatus) {
            AdminAppointmentApp.List.Controller.listAdminAppointments(appointmentStatus);
        },

        userStatusMaintain: function (adminAppointmentsListLayout) {
            AdminAppointmentApp.TrustedUser.Controller.listTrustedUser(adminAppointmentsListLayout);
        },

        timeOffMaintain: function(adminAppointmentsListLayout) {
            AdminAppointmentApp.TimeOff.Controller.timeOffMaintain(adminAppointmentsListLayout);

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

    //SuperAppManager.trigger('timeOff:maintain', adminAppointmentsListLayout);

    SuperAppManager.on('timeOff:maintain', function(adminAppointmentsListLayout) {
        SuperAppManager.navigate("maintainTimeOff");
        API.timeOffMaintain(adminAppointmentsListLayout);

    });

    SuperAppManager.addInitializer(function () {
        new AdminAppointmentApp.Router({
            controller: API
        });
    });

}, moment);