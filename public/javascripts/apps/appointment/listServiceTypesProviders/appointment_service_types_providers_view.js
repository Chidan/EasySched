SuperAppManager.module('AppointmentsApp.ListNew', function (ListNew, SuperAppManager, Backbone, Marionette, $, _, moment) {

    //defining Layout --> which will hold all views of page
    ListNew.Layout = Marionette.Layout.extend({
        template: "#appointment-layout",
        //defining regions of layout
        regions: {
            region1: '#region-1',
            region2: '#region-2',
            region3: '#region-3',
            region4: '#region-4',
            region5: '#region-5'

        }
    });

    //defining view for unordered list
    ListNew.ServiceProvidersItemView = Marionette.ItemView.extend({
        template: '#serviceProviderList',
        tagName: 'li',
        events: {

        }
    });



    //defining view to hold bootstrap collapse
    ListNew.ServiceTypesCompositeView = Marionette.CompositeView.extend({
        template: '#serviceTypeServiceProviderList',
        //tagName: 'div',
        className: 'panel panel-info',
        itemView: ListNew.ServiceProvidersItemView,
        itemViewContainer: 'ul',


        //Below code is not going to work because we have not setup provider collection
        //initialize: function(){
        //   this.collection = this.model.get('providers');
        //},

        events: {
            'click a': 'selectedServiceType'
        },

        selectedServiceType: function (e) {
            e.preventDefault();

            this.trigger('serviceType:selected', this.model);
        }
    });

    ListNew.ServiveTypesProvidersCollectionView = Marionette.CollectionView.extend({
        //tagName: 'div',
        className: 'panel-group',
        id: 'accordion',
        itemView: ListNew.ServiceTypesCompositeView,
        collection: '',
        events: {

        }
    });

}, moment);