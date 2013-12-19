SuperAppManager.module('MyAppsApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {

    Show.Controller = {
        showMyApps: function () {


            MyApp = Contact = Backbone.Model.extend({});

            MyApps = Backbone.Collection.extend({
                model: MyApp
            });

            var myApps = new MyApps([
                {
                    myAppName: "Appointments",
                    myAppIcon: "glyphicon-calendar",
                    status: "enabled"
                },
                {
                    myAppName: "Social Media",
                    myAppIcon: "glyphicon-calendar",
                    status: "disabled"
                },
                {
                    myAppName: "Polls",
                    myAppIcon: "glyphicon-calendar",
                    status: "disabled"
                },
                {
                    myAppName: "Survey",
                    myAppIcon: "glyphicon-calendar",
                    status: "disabled"
                }
            ]);

            var myAppsLayout = new Show.MyAppCollectionView({
                collection: myApps
            });

            myAppsLayout.on("itemview:appointments:maintain", function (childView, model) {
                SuperAppManager.trigger("appointments:maintain", model);
            });

            SuperAppManager.mainRegion.show(myAppsLayout);

        }
    }


});