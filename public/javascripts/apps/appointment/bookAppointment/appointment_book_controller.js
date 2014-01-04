SuperAppManager.module('AppointmentsApp.Book', function (Book, SuperAppManager, Backbone, Marionette, $, _, moment) {

    Book.Controller = {

        showBookAppointment: function (newAppointment) {

            //var newAppointment = new SuperAppManager.Entities.Appointments();
            var bookAppointmentView = new Book.BookAppointmentFormView({
                model: newAppointment
            });

            bookAppointmentView.on("form:submit", function (data) {

                /*if ( (SuperAppManager.loggedInUser.get('username')) != 'undefined')
                {
                    data['username'] = SuperAppManager.loggedInUser.get('username');
                }*/

                data.appointmentDate = this.model.get('appointmentDate');
                data.appointmentDuration = this.model.get('appointmentDuration');
                data.appointmentStart = this.model.get('appointmentStart');
                data.appointmentStatus = this.model.get('appointmentStatus');
                data.businessId = this.model.get('businessId');
                data.serviceProvider = this.model.get('serviceProvider');
                data.serviceType = this.model.get('serviceType');
                data.username = this.model.get('username');

                this.model.save(data, {
                    success: function (model, response) {
                        if (response.login == "failed") {
                            alert('Please login to save your appointment ');
                            SuperAppManager.trigger("login:show");
                            //SuperAppManager.dialogRegion.closeDialog();
                        }
                        else {
                            //SuperAppManager.trigger("appointments:show", model.get('businessId'), model.get('appointmentDate'));
                            SuperAppManager.trigger('appointments:refresh');
                            SuperAppManager.dialogRegion.closeDialog();
                        }


                    },
                    error: function () {
                        console.log('Login failed');
                    }
                });

            });

            /* bookAppointmentView.on("show", function () {
             this.$el.dialog({
             modal: true,
             width: "auto"
             });
             });*/

            SuperAppManager.dialogRegion.show(bookAppointmentView);

        }


    };
}, moment);