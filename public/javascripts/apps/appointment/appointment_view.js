/*
 This page will be used for booking appointments
 */

SuperAppManager.module('AppointmentApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {


    Show.Appointment = Backbone.Model.extend({
        urlRoot: 'appointments',

        defaults: {

        }
    });


    Show.CalendarWindow = Marionette.ItemView.extend({

        template: "#calendar-view",

        onShow: function () {
            this.$("#datepicker").datepicker({ minDate: -0, maxDate: +365 });
        },


        events: {
            'change input#datepicker': 'selectedDate'

        },

        //event handlers
        selectedDate: function () {
            console.log('Inside event ' + this.$("#datepicker").datepicker("getDate"));


        }

    });

    Show.Controller = {
        viewCal: function () {
            var calendarView = new Show.CalendarWindow();

            SuperAppManager.mainRegion.show(calendarView);
        }

    };


    Show.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "appointments": "showCalendar"
        }


    });


    var API = {
        showCalendar: function () {
            Show.Controller.viewCal();
        }
    };


    SuperAppManager.addInitializer(function () {
        new Show.Router({
            controller: API
        });
    });

});



