SuperAppManager.module('AppointmentsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _) {


    List.Controller = {

        viewCal: function () {
            var appointmentsView = new List.AppointmentsColelction();

            SuperAppManager.mainRegion.show(appointmentsView);
        },

        listAppointments: function (businessID) {
            //console.log(businessID);
            var loadingView = new SuperAppManager.Common.Views.Loading({
                title: "Data Loading for all Businesses",
                message: "Data loading artificially delayed from server"
            });
            SuperAppManager.mainRegion.show(loadingView);

            //fetching all appointments corresponding to given businessID
            var fetchingBusiness = SuperAppManager.request("appointment:entitiesForBusiness", businessID);



        }

    };




});