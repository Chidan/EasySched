SuperAppManager.module('HeaderApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _) {


    List.HeaderView = Marionette.ItemView.extend({
        template: "#navbar-template",

        modelEvents: {
            "change": "fieldsChanged"
        },

        events: {
            "click a.js-how-it-works": "howItWorks",
            "click a.js-register-business": "registerBusiness",
            "click a.js-business-name": "displayBusiness",
            "click a.js-username": "displayUser",
            "click a.js-logout": "logout",
            'click button.js-submit': 'loginClicked',
            'click a.js-singup': 'callSignupView'
        },

        fieldsChanged: function() {
            this.render();
        },

        howItWorks: function (e) {
            e.preventDefault();
        },

        registerBusiness: function (e) {
            e.preventDefault();
            this.trigger("business:new");
        },

        displayBusiness: function (e) {
            e.preventDefault();
        },

        displayUser: function (e) {
            e.preventDefault();
        },

        logout: function (e) {
            e.preventDefault();
            this.trigger("user:logout");
        },

        loginClicked: function (e) {
            //stop the default action of <a> tag and page refresh
            e.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("form:submit", data);
        },

        callSignupView: function (e) {
            e.preventDefault();
            //console.log('signup triggered');
            this.trigger("form:signup");
        }


    });

    /*
     List.Header = Marionette.ItemView.extend({
     template: "#header-link",
     tagName: "li",

     events: {
     "click a": "navigate"
     },

     navigate: function (e) {
     e.preventDefault();
     this.trigger("navigate", this.model);
     },

     onRender: function () {
     if (this.model.selected) {
     // add class so Bootstrap will highlight the active entry in the navbar
     this.$el.addClass("active");
     }
     }
     });

     List.Headers = Marionette.CompositeView.extend({
     template: "#header-template",
     className: "navbar navbar-inverse navbar-fixed-top",
     itemView: List.Header,
     itemViewContainer: "ul",

     events: {
     "click a.brand": "brandClicked"
     },

     //Handle brand:clicked in list_controller.js of header
     brandClicked: function (e) {
     e.preventDefault();
     this.trigger("brand:clicked");
     }

     });*/
});
