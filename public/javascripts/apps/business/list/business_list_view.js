//This module is only used for defining classes ItemView and CompositeView
SuperAppManager.module('BusinessApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _) {

    //defining Layout
    List.Layout = Marionette.Layout.extend({
        template: "#business-list-layout",
        //defining regions of layout
        regions: {
            panelRegion: "#panel-region",
            businessRegion: "#business-region"
        }
    });

    //Defining view for the "Create business" button
    List.Panel = Marionette.ItemView.extend({
        template: "#business-list-top-panel",
        triggers: {
            //trigger for New button
            'click button.js-new': "business:new"
        },

        events: {
            'click button.js-filter': 'filterClicked'
        },

        filterClicked: function () {
            var criterion = this.$(".js-filter-criterion").val();
            this.trigger("business:filter", criterion);
        },

        ui: {
            criterion: "input.js-filter-criterion"
        },

        //Listening to event "filter:criterion" and setting the criterion to the input field
        onSetFilterCriterion: function (criterion) {
            $(this.ui.criterion).val(criterion);
        }
    });

    List.Business = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#business-list-item",

        //start of event handling
        events: {
            "click": "highlightName",
            "click td": "alertCellText",
            "click td a.js-show": "showClicked",
            "click td a.js-appointment": "showCalendar",
            "click td a.js-edit": "editClicked",
            "click button.js-delete": "deleteClicked"
        },

        //for animating the table row when edit is clicked
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
            this.trigger("business:show", this.model);
        },

        showCalendar: function (e) {
            //stop propagation of other events like line highlighting
            e.stopPropagation();
            //stop the default action of <a> tag and page refresh
            e.preventDefault();

            this.trigger("business:showBusinessCalendar", this.model);
        }

        //Edit and delete event will be handled later
        /*       editClicked: function (e) {
         e.preventDefault();
         e.stopPropagation();
         this.trigger("business:edit", this.model);
         },

         deleteClicked: function (e) {
         e.stopPropagation();
         //this.model.collection.remove(this.model);
         this.trigger("business:delete", this.model);
         },

         alertCellText: function (e) {
         //  alert($(e.target).text());
         },

         //for animating the table row when delete is clicked
         remove: function () {
         this.$el.fadeOut(function () {
         $(this).remove();
         });
         }
         */

    });

    List.BusinessCollectionView = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: "#business-list",
        emptyView: NoBusinessView,
        itemView: List.Business,
        itemViewContainer: "tbody",

        //Listen to reset event on collection, then add the itemView <tr> to compositeView<table>
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

    var NoBusinessView = Marionette.ItemView.extend({
        template: "#business-list-none",
        tagName: "tr",
        className: "alert"
    });


});


