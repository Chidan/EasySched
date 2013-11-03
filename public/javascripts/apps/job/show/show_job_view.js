//Here we build the
//  - class for the a single job view,
//  - handle the edit button for job

SuperAppManager.module('JobsApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Job = Marionette.ItemView.extend({
        template: "#job-view",

        events: {
            "click a.js-edit": "editClicked"
        },

        editClicked: function (e) {
            e.preventDefault();
            this.trigger("job:edit", this.model);
        }
    });

    Show.MissingJob = Marionette.ItemView.extend({
        template: "#missing-job-view"
    });

});