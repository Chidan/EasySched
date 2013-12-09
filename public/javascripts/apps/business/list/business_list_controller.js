SuperAppManager.module('BusinessApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _) {
        List.Controller = {
            //If criterion provided, we need to filter our business collection, and display the criterion in the filtering input field in our view:
            listBusiness: function (criterion) {
                var loadingView = new SuperAppManager.Common.Views.Loading({
                    title: "Data Loading for all Businesses",
                    message: "Data loading artificially delayed from server"
                });
                SuperAppManager.mainRegion.show(loadingView);

                //Initializing layout
                var businessListLayout = new List.Layout();
                //Initializing Top Panel - which contains "button for new business" & "input field for filter criterion"
                var businessListPanel = new List.Panel();

                //fetching all business from db
                //var fetchingBusiness = SuperAppManager.request("business:entities");
                //Calling SuperAppManager.request("business:entityCategory", criterion);
                //instead of fetching all business by calling -  SuperAppManager.request("business:entities");
                var fetchingBusiness = SuperAppManager.request("business:entityCategory", criterion);
                //waiting till the fetching is finished
                $.when(fetchingBusiness).done(function (business) {
                        if (business !== undefined) {

                            //creating collection of filtered business
                            var filteredBusiness = SuperAppManager.Entities.FilteredCollection({
                                collection: business,

                                filterFunction: function (filterCriterion) {
                                    var criterion = filterCriterion.toLowerCase();
                                    return function (business) {
                                        if (business.get('businessName').toLowerCase().indexOf(criterion) !== -1
                                            || business.get('businessCategory').toLowerCase().indexOf(criterion) !== -1
                                        //|| business.get('ratting').toLowerCase().indexOf(criterion) !== -1
                                            ) {
                                            return business;
                                        }
                                    };
                                }
                            });

                            if (criterion) {
                                filteredBusiness.filter(criterion);
                                businessListPanel.once("show", function () {
                                    businessListPanel.triggerMethod("set:filter:criterion", criterion);
                                });
                            }

                            //Instantiating view, this will also render our collection
                            businessListView = new List.BusinessCollectionView({  collection: filteredBusiness});

                            //Adding Business top Panel and listBusiness to layout
                            businessListLayout.on("show", function () {
                                //Add top panel to panelRegion of Layout
                                businessListLayout.panelRegion.show(businessListPanel);
                                //Add businessListView to businessRegion of Layout and finally add businessListLayout to the mainRegion
                                businessListLayout.businessRegion.show(businessListView);
                            });

                            //Listening to business:filter event
                            businessListPanel.on("business:filter", function (filterCriterion) {
                                filteredBusiness.filter(filterCriterion);
                                SuperAppManager.trigger("business:filter", filterCriterion);
                            });

                            //Listening to event of new business
                            businessListPanel.on("business:new", function () {

                                var newBusiness = new SuperAppManager.Entities.Business();
                                var view = new SuperAppManager.BusinessApp.New.Business({
                                    model: newBusiness
                                });

                                SuperAppManager.dialogRegion.show(view);

                                view.on("form:submit", function (data) {

                                    if (newBusiness.save(data)) {
                                        business.add(newBusiness);
                                        //triggering "dialog:close" which will be handled in dialog region instead of calling "SuperAppManager.dialogRegion.close();"
                                        view.trigger("dialog:close");
                                        //SuperAppManager.dialogRegion.close();
                                        // business.reset();
                                        var newBusinessView = businessListView.children.findByModel(newBusiness);

                                        // check whether the new business view is displayed (it could be
                                        // invisible due to the current filter criterion)
                                        if (newBusinessView) {
                                            newBusinessView.flash("success");
                                        }
                                    }
                                    else {
                                        view.triggerMethod("form:data:invalid",
                                            newBusiness.validationError);
                                    }
                                });
                            });

                            //responding to DELETE button
                            //listening to events from item view in file list_view, and hence the convention --> itemview:business:delete
                            businessListView.on("itemview:business:delete", function (childView, model) {
                                //business.remove(model);
                                model.destroy()
                            });
                            //responding to SHOW button
                            businessListView.on("itemview:business:show", function (childView, model) {
                                //trigger event on SuperAppManager application so any one in the whole application can listen
                                SuperAppManager.trigger("business:show", model.get('_id'));
                            });
                            //responding to Calendar button
                            //responding to SHOW button
                            businessListView.on("itemview:business:showBusinessCalendar", function (childView, model) {
                                //trigger event on SuperAppManager application so any one in the whole application can listen

                                var tomorrowsDate = moment().add('d', 1).format("YYYY-MM-DD");

                                SuperAppManager.trigger("appointments:show", model.get("_id"), tomorrowsDate);
                            });
                            //responding to edit button
                            businessListView.on("itemview:business:edit", function (childView, model) {
                                var view = new SuperAppManager.BusinessApp.Edit.Business({
                                    model: model
                                });

                                view.on("form:submit", function (data) {

                                    if (model.save(data)) {
                                        childView.render();
                                        view.trigger("dialog:close");
                                        //SuperAppManager.dialogRegion.close();
                                        childView.flash("success");
                                    }
                                    else {
                                        //triggering method "onFormDataInvalid" with property of model - "validation error"
                                        view.triggerMethod("form:data:invalid", model.validationError);
                                    }
                                });


                                SuperAppManager.dialogRegion.show(view);
                            });
                            SuperAppManager.mainRegion.show(businessListLayout);
                        }
                    }
                )
                ;


            }
        }
    }
)
;

