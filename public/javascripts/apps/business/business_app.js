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

        newBusiness: function () {

            BusinessApp.New.Controller.newBusiness();
        },

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

        showAppointments: function (businessModel, tomorrowsDate) {
            SuperAppManager.AppointmentsApp.List.Controller.listAppointments(businessModel.get("_id"), tomorrowsDate)
        }
    };


    SuperAppManager.on("business:new", function () {
        SuperAppManager.navigate("newBusiness");
        API.newBusiness();
    });

    SuperAppManager.on("business:list", function () {
        SuperAppManager.navigate("business");
        API.listBusiness();
    });

    SuperAppManager.on("business:show", function (id) {

        console.log('business ID saved ' + id);
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

    /*SuperAppManager.on("appointments:show", function (businessModel) {
     var tomorrowsDate = moment().add('d', 1).format("YYYY-MM-DD");
     SuperAppManager.navigate( "/appointments/" + businessModel.get('_id') );
     API.showAppointments(businessModel, tomorrowsDate);
     });*/


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

