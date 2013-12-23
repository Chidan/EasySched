SuperAppManager.module('AdminAppointmentApp.TrustedUser', function (TrustedUser, SuperAppManager, Backbone, Marionette, $, _, moment) {

    TrustedUser.TrustedUserItemView = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#admin-trusted-user-list-item",

        events: {
            'click button.js-un-set-trusted-user': 'unSetTrustedUser'
        },

        flash: function (cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                setTimeout(function () {
                    $view.toggleClass(cssClass)
                }, 500);
            });
        },

        unSetTrustedUser: function (e) {
            e.preventDefault();
        this.trigger("user:unTrust", this.model);

        }
    });

    TrustedUser.TrustedUserCollectionView = Marionette.CompositeView.extend({
        template: "#admin-trusted-user-list",
        tagName: "table",
        className: "table table-hover",
        emptyView: NoAppointmentsView,
        itemView: TrustedUser.TrustedUserItemView,
        itemViewContainer: "tbody",

        events: {

        }
        //events handling

    });

    var NoAppointmentsView = Marionette.ItemView.extend({
        template: "#appointments-list-none",
        tagName: "tr",
        className: "alert"
    });


});