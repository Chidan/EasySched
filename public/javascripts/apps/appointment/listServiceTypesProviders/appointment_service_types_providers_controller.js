SuperAppManager.module('AppointmentsApp.ListNew', function (ListNew, SuperAppManager, Backbone, Marionette, $, _, moment) {

        ListNew.Controller = {
            showServiceTypesProviders: function (businessModel) {
                var serviceProviderLayout = new ListNew.Layout();


                var fetchingServiceTypes =
                    SuperAppManager.request("businessServiceTypeProvider:serviceTypes", businessModel.get('_id'), "serviceTypes", null);

                $.when(fetchingServiceTypes).done(function (serviceTypes) {

                        var serviceTypesCompositeView = new ListNew.ServiceTypesCompositeView();
                        var serviceTypesProvidersCollectionView = new ListNew.ServiveTypesProvidersCollectionView({
                            collection: serviceTypes });

                        //var serviceTypesProvidersCollectionView = new ListNew.ServiveTypesProvidersCollectionView({ collection: serviceTypes });
                        //var serviceProvidersCompositeView = new ListNew.ServiceProvidersCompositeView({ collection: serviceTypes});


                        serviceTypesProvidersCollectionView.on('itemview:serviceType:selected', function (childView, model) {
                            console.log('Inside the event' + model.get('serviceType'));


                        });

                        serviceProviderLayout.region1.show(serviceTypesProvidersCollectionView);

                    }
                );
                SuperAppManager.mainRegion.show(serviceProviderLayout);
            }
        }
    },
    moment
)
;