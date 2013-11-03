SuperAppManager.module('HeaderApp', function (Header, SuperAppManager, Backbone, Marionette, $, _) {
    var API = {
        listHeader: function () {
            Header.List.Controller.listHeader();
        }
    };

    SuperAppManager.commands.setHandler("set:active:header", function (name) {
        SuperAppManager.HeaderApp.List.Controller.setActiveHeader(name);
    });

    Header.on("start", function () {
        API.listHeader();
    });
});