/*
 This page will be used for booking appointments
 */

SuperAppManager.module('AppointmentsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _) {


    List.Appointment = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#appointment-list-item",

        events: {

        }

        //events handling

    });

    List.AppointmentsColelction = Marionette.CompositeView.extend({
        template: "#appointment-list",
        tagName: "table",
        className: "table table-hover",
        emptyView: NoAppointmentsView,
        itemView: List.Appointment,
        itemViewContainer: "tbody",

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





    var NoAppointmentsView = Marionette.ItemView.extend({
        template: "#appointments-list-none",
        tagName: "tr",
        className: "alert"
    });

});





