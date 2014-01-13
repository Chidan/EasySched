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
                        SuperAppManager.Flash.success('You have been loggedin: ' + SuperAppManager.loggedInUser.get("username"));
                        SuperAppManager.trigger("user:loggedIn");
                    },
                    error: function () {
                        SuperAppManager.Flash.error('Wrong userid or password');
                    }
                });
            });

            headerView.on('facebook:login', function () {
                console.log('facebook clicked');

                $.ajax({
                    type: "GET",
                    url: '/auth/facebook',
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        SuperAppManager.Flash.success('facebook login successful: ' + data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        SuperAppManager.Flash.error('error ' + textStatus + " " + errorThrown);
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
                SuperAppManager.trigger("signup:show");
            });

            headerView.on("user:logout", function () {

                console.log('logout triggerd');
                $.ajax({
                    url: '/logout',
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        SuperAppManager.Flash.notice('You have been logged out: ' + data.username);

                        headerModel.unset({ "username": data.username });
                        headerView.$("ul.js-user").addClass("hidden");
                        headerView.$("form.js-form-login").removeClass("hidden");

                        headerModel.unset({ "username": SuperAppManager.loggedInUser.get("businessName") });
                        headerView.$("ul.js-business-name").addClass("hidden");
                        headerView.$("li.js-register-business").removeClass("hidden");


                        delete  SuperAppManager.loggedInUser;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        SuperAppManager.Flash.error('error ' + textStatus + " " + errorThrown);
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
});