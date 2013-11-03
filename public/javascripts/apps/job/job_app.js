SuperAppManager.module('JobsApp', function (JobsApp, SuperAppManager, Backbone, Marionette, $, _) {
    JobsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            /*"contacts(?filter=:criterion)": "listContacts",
            "contacts/:id": "showContact",
            "contacts/:id/edit": "editContact"*/

            "jobs/:id": "showJob"


        }
    });

    var API = {
        listContacts: function (criterion) {
            SuperAppManager.ContactsApp.List.Controller.listContacts(criterion);
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "contacts");
        },

        showJob: function (id) {
            JobsApp.Show.Controller.showJob(id);
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "jobs");
        },

        editContact: function (id) {
            JobsApp.Edit.Controller.editContact(id);
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "contacts");
        }
    };


    SuperAppManager.on("contacts:list", function () {
        SuperAppManager.navigate("contacts");
        API.listContacts();
    });

    SuperAppManager.on("job:show", function (id) {
        //only impacting the URL in the address bar
        SuperAppManager.navigate("jobs/" + id);
        //actually redirecting page to display correct contect
        API.showJob(id);
    });

    SuperAppManager.on("contact:edit", function (id) {
        SuperAppManager.navigate("contacts/" + id + "/edit");
        API.editContact(id);
    });

    //Event listener to update the URL fragment when filtering
    SuperAppManager.on("contacts:filter", function (criterion) {
        if (criterion) {
            //If we have a filtering criterion, we add it as a query string to the URL fragment
            SuperAppManager.navigate("contacts?filter=" + criterion);
        }
        else {
            SuperAppManager.navigate("contacts");
        }
    });

    SuperAppManager.addInitializer(function () {
        new JobsApp.Router({
            controller: API
        });
    });
});

