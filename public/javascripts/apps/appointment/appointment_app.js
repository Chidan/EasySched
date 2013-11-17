SuperAppManager.module('AppointmentsApp', function (AppointmentsApp, SuperAppManager, Backbone, Marionette, $, _) {

   AppointmentsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "appointments": "showAppointments"
        }
    });


    var API = {
        showAppointments: function () {
            //SuperAppManager.AppointmentsApp.List.Controller.listAppointments(id)
            SuperAppManager.AppointmentsApp.List.Controller.viewCal();
        }
    };


    SuperAppManager.addInitializer(function () {
        new AppointmentsApp.Router({
            controller: API
        });
    });



});