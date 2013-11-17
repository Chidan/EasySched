SuperAppManager.module('BusinessApp', function (BusinessApp, SuperAppManager, Backbone, Marionette, $, _) {
    BusinessApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            /*
             "business/:id/edit": "editContact"*/
            
            "business(?filter=:criterion)": "listBusiness",
            "business/:id": "showBusiness",
            "business/category/:category": "showBusinessByCategory"


        }
    });

    var API = {

        showBusiness: function (id) {
            BusinessApp.Show.Controller.showBusiness(id);
        },

        listBusiness: function (criterion) {
            SuperAppManager.BusinessApp.List.Controller.listBusiness(criterion);
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "business");
        },

        editContact: function (id) {
            BusinessApp.Edit.Controller.editContact(id);
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "business");
        },

        showBusinessByCategory: function (category) {
            //For the time being we will call listBusiness  method from controller.
            //And inside listBusiness method we will call -"SuperAppManager.request("business:entityCategory", category);"
            //instead of -"SuperAppManager.request("business:entities");"
            SuperAppManager.BusinessApp.List.Controller.listBusiness(category);
            //highlighting the active header --> will be handled in header_app.js
            SuperAppManager.execute("set:active:header", "business");
        },

        showAppointments: function (id) {
            SuperAppManager.AppointmentsApp.List.Controller.listAppointments(id)
        }
    };


    SuperAppManager.on("business:list", function () {
        SuperAppManager.navigate("business");
        API.listBusiness();
    });

    SuperAppManager.on("business:show", function (id) {
        //only impacting the URL in the address bar
        SuperAppManager.navigate("business/" + id);
        //actually redirecting page to display correct contect
        API.showBusiness(id);
    });

    SuperAppManager.on("search:showBusinessByCategory", function (category) {
        //only impacting the URL in the address bar
        SuperAppManager.navigate("business/category/" + category);
        //actually redirecting page to display correct contect
        API.showBusinessByCategory(category);
    });

    SuperAppManager.on("business:edit", function (id) {
        SuperAppManager.navigate("business/" + id + "/edit");
        API.editContact(id);
    });

    SuperAppManager.on("appointments:show", function (id) {
        SuperAppManager.navigate( id + "/appointments" );
        API.showAppointments(id);
    });


    //Event listener to update the URL fragment when filtering
    SuperAppManager.on("business:filter", function (criterion) {
        if (criterion) {
            //If we have a filtering criterion, we add it as a query string to the URL fragment
            SuperAppManager.navigate("business?filter=" + criterion);
        }
        else {
            SuperAppManager.navigate("business");
        }
    });

    SuperAppManager.addInitializer(function () {
        new BusinessApp.Router({
            controller: API
        });
    });
});

