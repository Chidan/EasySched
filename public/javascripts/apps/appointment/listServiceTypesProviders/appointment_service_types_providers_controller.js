SuperAppManager.module('AppointmentsApp.ListNew', function (ListNew, SuperAppManager, Backbone, Marionette, $, _, moment) {

    ListNew.Controller = {
        showServiceTypesProviders: function (businessModel) {
            var serviceProviderLayout = new ListNew.Layout();




            var fetchingServiceTypes =
                SuperAppManager.request("businessServiceTypeProvider:serviceTypes", businessModel.get('_id'), "serviceTypes", null);

            $.when(fetchingServiceTypes).done(function (serviceTypes) {

                 ServiceProvider = Backbone.Model.extend();

                ServiceProviders = Backbone.Collection.extend({
                    Model: ServiceProvider
                });

                // each serviceType serviceProviders must be a backbone collection
                // we initialize them here
                /*serviceTypes.each(function(serviceType) {
                   var serviceProvider = serviceType.get('provider');

                    var serviceProviders = new ServiceProviders( serviceProvider);
                    serviceType.set('provider', serviceProviders);
                });*/

                var func2 = function () {
                    serviceTypes.each(function(serviceType) {
                        var serviceProvider = serviceType.get('provider');

                        var serviceProviders = new ServiceProviders( serviceProvider);
                        serviceType.set('providers', serviceProviders);
                    });
                };

                var func3 = function () {
                    var serviceTypesProvidersCollectionView = new ListNew.ServiveTypesProvidersCollectionView({ collection: serviceTypes });
                    serviceProviderLayout.region1.show(serviceTypesProvidersCollectionView);

                };

                 var func1 = function() {
                     $.when(
                         func2()
                     ).then( function () {
                             func3()
                         })
                };

                func1();

                //var serviceTypesProvidersCollectionView = new ListNew.ServiveTypesProvidersCollectionView({ collection: serviceTypes });
                //serviceProviderLayout.region1.show(serviceTypesProvidersCollectionView);
            });
            SuperAppManager.mainRegion.show(serviceProviderLayout);
        }
    }
}, moment);