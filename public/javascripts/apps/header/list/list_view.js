ContactManager.module('HeaderApp.List', function (List, ContactManager, Backbone, Marionette, $, _) {
    List.Header = Marionette.ItemView.extend({
        template: "#header-link",
        tagName: "li"
    });

    List.Headers = Marionette.CompositeView.extend({
        template: "#header-template",
        className: "navbar navbar-inverse navbar-fixed-top",
        itemView: List.Header,
        itemViewContainer: "ul"
    });
});