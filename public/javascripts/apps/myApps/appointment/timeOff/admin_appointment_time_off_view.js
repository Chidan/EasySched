SuperAppManager.module('AdminAppointmentApp.TimeOff', function (TimeOff, SuperAppManager, Backbone, Marionette, $, _, moment) {

    TimeOff.TimeOffItemView = Marionette.ItemView.extend({
        tagName: "form",
        template: "#time-off-panel",

        onShow: function () {

            var myDate = new Date();
            var prettyDate = (myDate.getMonth() + 1) + '/' + (myDate.getDate() + 1 ) + '/' + myDate.getFullYear();
            //displaying the required dates
            this.$("#datepicker").datepicker({ minDate: -0, maxDate: +365 }).val();
        },

        events: {
            'change input#datepicker': 'selectedDate',
            'change input.js-all-day': 'allDayChecked',
            'click button.js-submit': 'saveTimeOff'

        },
        //event handling

        selectedDate: function (e) {
            e.preventDefault();
            var selectedDate = moment(this.$("#datepicker").datepicker("getDate")).format("YYYY-MM-DD");
            this.$("#datepicker").datepicker({ minDate: -0, maxDate: +365 }).val(selectedDate);

        },

        allDayChecked: function (e) {
            e.preventDefault();
            if (this.$('.js-all-day').is(':checked')) {
                this.$('.js-start-time').prop('disabled', true);
                this.$('.js-end-time').prop('disabled', true);
            }
            else {
                this.$('.js-start-time').prop('disabled', false);
                this.$('.js-end-time').prop('disabled', false);
            }

        },

        saveTimeOff: function (e) {
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('timeOff:save', data);
        }
    });


}, moment);