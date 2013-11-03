//This module is only used for defining classes ItemView and CompositeView
SuperAppManager.module('ContactsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _) {

    //defining Layout
    List.Layout = Marionette.Layout.extend({
        template: "#contact-list-layout",
        //defining regions of layout
        regions: {
            panelRegion: "#panel-region",
            contactsRegion: "#contacts-region"
        }
    });

    //Defining view for the "Create contact" button
    List.Panel = Marionette.ItemView.extend({
        template: "#contact-list-top-panel",
        triggers: {
            'click button.js-new': "contact:new"
        },

        events: {
            'click button.js-filter': 'filterClicked'
        },

        filterClicked: function () {
            var criterion = this.$(".js-filter-criterion").val();
            this.trigger("contacts:filter", criterion);
        },

        ui: {
            criterion: "input.js-filter-criterion"
        },

        onSetFilterCriterion: function (criterion) {
            $(this.ui.criterion).val(criterion);
        }
    });

    List.Contact = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#contact-list-item",

        //start of event handling
        events: {
            "click": "highlightName",
            "click td": "alertCellText",
            "click td a.js-show": "showClicked",
            "click td a.js-edit": "editClicked",
            "click button.js-delete": "deleteClicked"
        },

        flash: function (cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                setTimeout(function () {
                    $view.toggleClass(cssClass)
                }, 500);
            });
        },

        highlightName: function (e) {
            this.$el.toggleClass('warning');
        },

        showClicked: function (e) {
            //stop propagation of other events like line highlighting
            e.stopPropagation();
            //stop the default action of <a> tag and page refresh
            e.preventDefault();
            this.trigger("contact:show", this.model);
        },

        editClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("contact:edit", this.model);
        },

        deleteClicked: function (e) {
            e.stopPropagation();
            //this.model.collection.remove(this.model);
            this.trigger("contact:delete", this.model);
        },

        alertCellText: function (e) {
            //  alert($(e.target).text());
        },

        remove: function () {
            this.$el.fadeOut(function () {
                $(this).remove();
            });
        }


    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: "#contact-list",
        emptyView: NoContactsView,
        itemView: List.Contact,
        itemViewContainer: "tbody",

        initialize: function () {
            this.listenTo(this.collection, "reset", function () {
                this.appendHtml = function (collectionView, itemView, index) {
                    collectionView.$el.append(itemView.el);
                }
            });
        },

        onCompositeCollectionRendered: function () {
            this.appendHtml = function (collectionView, itemView, index) {
                collectionView.$el.prepend(itemView.el);
            }
        }


//listening to even on the model and doing something on the collection
//        onItemviewContactDelete: function () {
//            this.$el.fadeOut(1000, function () {
//                $(this).fadeIn(1000);
//            });
//        }
    });

    var NoContactsView = Marionette.ItemView.extend({
        template: "#contact-list-none",
        tagName: "tr",
        className: "alert"
    });


});


