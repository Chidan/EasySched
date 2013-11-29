SuperAppManager.module('AppointmentsApp.Book', function (Book, SuperAppManager, Backbone, Marionette, $, _, moment) {


    Book.BookAppointmentFormView = Marionette.ItemView.extend({

        template: "#bookAppointment-form",
        model: SuperAppManager.Entities.Appointment,

        events: {
            'click button.js-submit': 'bookClicked'

        },

        bookClicked: function (e) {
            //stop the default action of <a> tag and page refresh
            e.preventDefault();

            var data = Backbone.Syphon.serialize(this);

            this.trigger("form:submit", data);
        }

    });
}, moment);

