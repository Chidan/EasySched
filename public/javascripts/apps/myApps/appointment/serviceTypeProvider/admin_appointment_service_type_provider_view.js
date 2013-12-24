SuperAppManager.module('AdminAppointmentApp.ServiceTypeProvider', function (ServiceTypeProvider, SuperAppManager, Backbone, Marionette, $, _, moment) {

    ServiceTypeProvider.ServiceTypeProviderView = Marionette.ItemView.extend({
        tagName: "form",
        template: "#service-type-provider-panel",
        events: {
            'click button.js-submit': 'saveServiceTypeProvider'
        },

        //event handling here
        saveServiceTypeProvider: function (e) {

            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('serviceTypeProvider:save', data);
        }

    });

});