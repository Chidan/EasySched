//This module will instantiate our view and handle the events
SuperAppManager.module('SearchApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Controller = {

        showSearch: function () {
            var searchView = new Show.SearchPanel();

            searchView.on("search:show", function (criterion) {
                console.log(criterion);
            });

            SuperAppManager.mainRegion.show(searchView);
        }
    }
});