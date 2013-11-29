/*
 This page will be used for booking appointments
 */

SuperAppManager.module('AppointmentsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _, moment) {

    //defining Layout --> which will hold calendar and appointments in separate views.
    List.Layout = Marionette.Layout.extend({
        template: "#appointment-list-layout",
        //defining regions of layout
        regions: {
            calendarRegion: "#calendar-region",
            appointmentsRegion: "#appointments-region"
        }
    });


    List.CalendarPanelView = Marionette.ItemView.extend({
        template: "#calendar-panel",

        onShow: function () {

            var myDate = new Date();
            var prettyDate = (myDate.getMonth() + 1) + '/' + (myDate.getDate() + 1 ) + '/' + myDate.getFullYear();
            //displaying the required dates
            this.$("#datepicker").datepicker({ minDate: -0, maxDate: +365 }).val(prettyDate);
        },

        events: {
            'change input#datepicker': 'selectedDate'
        },

        //event handlers
        selectedDate: function (e) {
            e.preventDefault(e)
            var selectedDate = moment(this.$("#datepicker").datepicker("getDate")).format("YYYY-MM-DD");

            this.trigger("Appointment:show", this.model.get("businessId"), selectedDate);
        }

    });//end of CalendarPanelView


    List.AppointmentView = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#appointment-list-item",

        events: {
            'click button.btn-success': "bookAppointment"
        },

        bookAppointment: function (e) {
            e.preventDefault();

            this.trigger("book:appointment", this.model);

        },

        onShow: function () {
            //var appointmentStatus = this.$(".appointmentStart").html();

            var appointmentStatus = this.model.attributes.userName;

            if (appointmentStatus == "free") {
                this.$(".js-book").addClass("btn-success enabled");
                this.$(".js-book").removeClass("btn-danger disabled");
            }


        }

        //events handling

    });

    List.AppointmentsColelctionView = Marionette.CompositeView.extend({
        template: "#appointment-list",
        tagName: "table",
        className: "table table-hover",
        emptyView: NoAppointmentsView,
        itemView: List.AppointmentView,
        itemViewContainer: "tbody",


        events: {

        }

        //events handling


    });


    var NoAppointmentsView = Marionette.ItemView.extend({
        template: "#appointments-list-none",
        tagName: "tr",
        className: "alert"
    });

}, moment);




