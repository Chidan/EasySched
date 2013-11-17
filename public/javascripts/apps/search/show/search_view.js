// This will be our entry page.
// This module is only used for defining classes ItemView and CompositeView

SuperAppManager.module('SearchApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {

    Show.SearchPanel = Marionette.ItemView.extend({

        template: "#search-view",

        events: {
            'click button.js-search': 'searchClicked'
        },

        searchClicked: function (e) {
            //stop the default action of <a> tag and page refresh
            e.preventDefault();
            var category = this.$(".js-search-criterion").val();
            //console.log(criterion);
            //this.trigger("search:show", criterion);
            this.trigger("search:showBusinessByCategory", category);
        }


//For now we will not worry about what is set in the search field
        /*      ui: {
         criterion: "input.js-filter-criterion"
         },

         onSetFilterCriterion: function (criterion) {
         $(this.ui.criterion).val(criterion);
         }*/
    });

});