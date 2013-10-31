ContactManager.module('HeaderApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Controller = {
        listHeader: function () {
            var links = ContactManager.request("header:entities");
            var headers = new List.Headers({collection: links});

            ContactManager.headerRegion.show(headers);
        }
    };
});