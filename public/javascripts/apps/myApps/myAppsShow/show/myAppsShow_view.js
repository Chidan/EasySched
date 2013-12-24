SuperAppManager.module('MyAppsApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.MyAppItemView = Marionette.ItemView.extend({
        template: "#myApps-list-item",
        events: {
            'click a.js-my-app': 'myAppsMaintain'
        },

        myAppsMaintain: function (e) {
            e.preventDefault();

            switch (this.model.get('myAppName')) {
                case 'Appointments':
                {

                    this.trigger("appointments:maintain");
                }
                    break;
                case 'Social Media':
                {

                }
                    break;
                case 'Polls':
                {

                }
                    break;
                case 'Survey':
                {

                }
                    break;
                default:

            }
        }
    });

    Show.MyAppCollectionView = Marionette.CollectionView.extend({
        tagName: "ul",
        itemView: Show.MyAppItemView
    });

});