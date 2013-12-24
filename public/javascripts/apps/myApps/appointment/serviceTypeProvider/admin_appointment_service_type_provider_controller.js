SuperAppManager.module('AdminAppointmentApp.ServiceTypeProvider', function (ServiceTypeProvider, SuperAppManager, Backbone, Marionette, $, _, moment) {

    ServiceTypeProvider.Controller = {
        serviceTypeProviderMaintain: function (adminAppointmentsListLayout) {

            serviceTypeProviderModel = new SuperAppManager.Entities.ServiceTypeProviderModel();

            serviceTypeProviderView = new ServiceTypeProvider.ServiceTypeProviderView({ model: serviceTypeProviderModel });

            serviceTypeProviderView.on('serviceTypeProvider:save', function (data) {

                data.businessId = SuperAppManager.loggedInUser.get("_id");
                console.log(data);

                this.model.save(data, {
                    success: function (model, response) {
                        alert('Service Type & Service Provider Saved');
                    },
                    error: function () {
                        alert('Error in saving Service Type & Service Provider');
                    }
                });

            });

            adminAppointmentsListLayout.adminAppointmentsRegion.show(serviceTypeProviderView);

        }

    };

});