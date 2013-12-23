/*In the interest of maintainability. By relying on URLs to control our application, we’ll
 eventually start using Backbone as a stateless framework: passing various information
 in the URLs instead of managing it within our application. Using events to constrain
 us, we’ll automatically enforce the separation between “application behavior” and “URL
 management”.
 */

SuperAppManager.module('HeaderApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _) {

    List.Controller = {
        listHeader: function () {

            var headerModel = new SuperAppManager.Entities.HeaderModel();
            var headerView = new List.HeaderView({
                model: headerModel
            });
            SuperAppManager.headerRegion.show(headerView);


            headerView.on("form:submit", function (data) {

                SuperAppManager.loggedInUser = new SuperAppManager.Entities.LoginUser();
                var loginView = new SuperAppManager.LoginApp.Show.LoginForm({
                    model: SuperAppManager.loggedInUser
                });

                loginView.model.save(data, {
                    success: function (model, response) {

                        alert('You have been loggedin: ' + SuperAppManager.loggedInUser.get("username"));
                        SuperAppManager.trigger("user:loggedIn");
                    },
                    error: function () {
                        console.log('Login failed');
                        alert('Wrong userid or password');
                    }
                });


            });

            SuperAppManager.on("user:loggedIn", function () {

                if (SuperAppManager.loggedInUser.get("businessName")) {
                    headerModel.set({ "username": SuperAppManager.loggedInUser.get("username") });
                    headerModel.set({ "businessName": SuperAppManager.loggedInUser.get("businessName") });

                    headerView.$("ul.js-user").removeClass("hidden");
                    headerView.$("form.js-form-login").addClass("hidden");

                    headerView.$("ul.js-business-name").removeClass("hidden");
                    headerView.$("li.js-register-business").addClass("hidden");
                }
                else {
                    headerModel.set({ "username": SuperAppManager.loggedInUser.get("username") });
                    headerView.$("ul.js-user").removeClass("hidden");
                    headerView.$("form.js-form-login").addClass("hidden");
                }
            });


            headerView.on("form:signup", function () {
                console.log('signup clicked');
                SuperAppManager.trigger("signup:show");

            });

            headerView.on("user:logout", function () {

                console.log('logout triggerd');
                $.ajax({
                    url: '/logout',
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        alert('You have been logged out: ' + data.username);

                        headerModel.unset({ "username": data.username });
                        headerView.$("ul.js-user").addClass("hidden");
                        headerView.$("form.js-form-login").removeClass("hidden");

                        headerModel.unset({ "username": SuperAppManager.loggedInUser.get("businessName") });
                        headerView.$("ul.js-business-name").addClass("hidden");
                        headerView.$("li.js-register-business").removeClass("hidden");


                        delete  SuperAppManager.loggedInUser;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('error ' + textStatus + " " + errorThrown);
                    }
                });
            });

            headerView.on("about:show", function () {
                SuperAppManager.trigger("about:show");
            });

            headerView.on("business:new", function () {
                SuperAppManager.trigger("business:new");
            });

            headerView.on("business:show", function () {
                SuperAppManager.trigger("business:show", SuperAppManager.loggedInUser.get('_id'));
            });

            headerView.on("apps:show", function () {
                SuperAppManager.trigger("myApps:show");
            });


        }
    };


    /*
     List.Controller = {
     //Handle the listing/showing of header menu
     listHeader: function () {
     //Getting all the headers or navigation links
     var links = SuperAppManager.request("header:entities");
     //creating object of composite view
     var headers = new List.Headers({collection: links});


     headers.on("brand:clicked", function () {
     //Changing app to naviaget to "SearchView" which is our new home page, instead of navigating to #contacts
     //SuperAppManager.trigger("contacts:list");
     SuperAppManager.navigate("", {trigger: true});
     });

     //handling highlighting of the header menu items when entry was mouse clicked
     headers.on("itemview:navigate", function (childView, model) {
     var url = model.get('url');
     if (url === 'contacts') {
     SuperAppManager.trigger("contacts:list");
     }
     else if (url === 'about') {
     SuperAppManager.trigger("about:show");
     }
     else if (url === 'business') {
     SuperAppManager.trigger("business:list");
     }
     else if (url === 'login') {
     SuperAppManager.trigger("login:show");
     }
     else if (url === 'logout') {
     //SuperAppManager.trigger("logout:call");
     $.ajax({
     url: 'http://localhost:3000/logout',
     dataType: "json",
     cache: false,
     success: function (data) {
     alert('You have been logged out: ' + data.user);
     },
     error: function (jqXHR, textStatus, errorThrown) {
     alert('error ' + textStatus + " " + errorThrown);
     }
     });
     }
     //This else block will be added to the code later
     //  else if (url === 'jobs') {
     //SuperAppManager.trigger("job:list");
     //}
     else if (url === 'newBusiness') {
     SuperAppManager.trigger("business:new");
     }
     else {
     throw "No such sub-application: " + url;
     }
     });


     SuperAppManager.headerRegion.show(headers);
     },

     setActiveHeader: function (headerUrl) {
     var links = SuperAppManager.request("header:entities");
     var headerToSelect = links.find(function (header) {
     return header.get("url") === headerUrl;
     });
     headerToSelect.select();
     links.trigger("reset");
     }

     };
     */

});