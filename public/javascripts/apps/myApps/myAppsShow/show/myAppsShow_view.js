SuperAppManager.module('MyAppsApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.MyAppItemView = Marionette.ItemView.extend({
        template: "#myApps-list-item",
        events: {
            'click button': 'myAppsMaintain'
        },

        myAppsMaintain: function (e) {
            e.preventDefault();

            switch (this.model.get('myAppName')) {
                case 'Appointments':
                {
                    console.log('case 1');
                    this.trigger("appointments:maintain");
                }
                    break;
                case 'Social Media':
                {
                    console.log('case 2');
                }
                    break;
                case 'Polls':
                {
                    console.log('case 3');
                }
                    break;
                case 'Survey':
                {
                    console.log('case 4');
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