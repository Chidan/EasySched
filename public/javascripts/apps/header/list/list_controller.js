/*In the interest of maintainability. By relying on URLs to control our application, we’ll
 eventually start using Backbone as a stateless framework: passing various information
 in the URLs instead of managing it within our application. Using events to constrain
 us, we’ll automatically enforce the separation between “application behavior” and “URL
 management”.
 */

SuperAppManager.module('HeaderApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _) {
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
                //This else block will be added to the code
                /*  else if (url === 'jobs') {
                 SuperAppManager.trigger("job:list");
                 }*/
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
});