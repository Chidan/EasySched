SuperAppManager.module('JobsApp.Show', function (Show, SuperAppManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showJob: function (id) {
            var loadingView = new SuperAppManager.Common.Views.Loading({
                title: "Data Loading for Job",
                message: "Data loading artificially delayed from server"
            });
            SuperAppManager.mainRegion.show(loadingView);
            var fetchingContact = SuperAppManager.request("job:entity", id);
            $.when(fetchingContact).done(function (job) {
                var jobView;
                if (job !== undefined) {
                    console.log(job);
                    jobView = new Show.Job({
                        model: job
                    });


                    jobView.on("job:edit", function (job) {
                        SuperAppManager.trigger("job:edit", job.get('_id'));
                    });
                }
                else {
                    jobView = new Show.MissingJob();
                }

                SuperAppManager.mainRegion.show(jobView);
            });
        }
    }
});




