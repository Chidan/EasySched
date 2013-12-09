SuperAppManager.module('HeaderApp', function (Header, SuperAppManager, Backbone, Marionette, $, _) {
    var API = {
        listHeader: function () {
            Header.List.Controller.listHeader();
        },

        userLoggedIn: function (username) {

            Header.List.Controller.changeHeader(username);

        }
    };


    SuperAppManager.commands.setHandler("set:active:header", function (name) {
        SuperAppManager.HeaderApp.List.Controller.setActiveHeader(name);
    });

    /*SuperAppManager.on("user:loggedIn", function (username) {
        console.log(username);
        API.userLoggedIn(username);
    });*/

    Header.on("start", function () {
        API.listHeader();
    });
});