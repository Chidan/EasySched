/*
 This page will be used for booking appointments, this page will list all the available appointments for a selected
 business
 */

SuperAppManager.module('AppointmentsApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _, moment) {

        //defining Layout --> which will hold calendar and appointments in separate views.
        List.Layout = Marionette.Layout.extend({
            template: "#appointment-list-layout",
            //defining regions of layout
            regions: {
                calendarRegion: "#calendar-region",
                appointmentsRegion: "#appointments-region",
                serviceTypeRegion: "#service-type-region",
                serviceProviderRegion: "#service-provider-region"
            }
        });


        List.CalendarPanelView = Marionette.ItemView.extend({
            template: "#calendar-panel",

            onShow: function () {

               this.trigger('datePicker:initialize');
            },

            events: {
                'change input#datepicker': 'selectedDate'

            },

//event handlers
            selectedDate: function (e) {
                e.preventDefault();
                var selectedDate = moment(this.$("#datepicker").datepicker("getDate")).format("YYYY-MM-DD");
                this.$("#datepicker").datepicker({ minDate: 0, maxDate: +365 }).val(selectedDate);
                this.model.set({ appointmentDate: selectedDate});
                this.trigger("Appointment:show");
            }

        })
        ;//end of CalendarPanelView


//-----------Start of ServiceType view------------------------
        List.ServiceTypePanelItemView = Marionette.ItemView.extend({
            template: '#appointment-service-type-panel',
            tagName: 'option',
            events: {

            }
        });

        List.ServiceTypePanelCollectionView = Marionette.CollectionView.extend({
            tagName: "select",
            itemView: List.ServiceTypePanelItemView,
            className: 'form-control js-service-type',
            events: {
                'change': 'selectedService'
            },

            selectedService: function (e) {
                e.preventDefault();
                //console.log(this.$("option:selected").val());
                this.trigger('serviceType:selected');
            },

            onShow: function () {
                //console.log(this.$("option:selected").val());
                //this.trigger('serviceType:selected', this.$("option:selected").val());
            }

        });//End of ServiceType view

//-----------Start of ServiceProvider view------------------------
        List.ServiceProviderPanelItemView = Marionette.ItemView.extend({
            template: '#appointment-service-provider-panel',
            tagName: 'option',
            events: {
                'change': 'selectedProvider'
            },
            selectedProvider: function (e) {
                e.preventDefault();
                this.trigger('serviceProvider:selected');
            }
        });

        List.ServiceProviderPanelCollectionView = Marionette.CollectionView.extend({
            tagName: "select",
            itemView: List.ServiceProviderPanelItemView,
            className: 'form-control js-service-provider',
            events: {
                'change': 'selectedProvider'
            },

            selectedProvider: function (e) {
                e.preventDefault();

                console.log(this.$("option:selected").val());

                this.trigger('serviceProvider:selected', this.$("option:selected").val());
            },

            onShow: function () {
                //console.log(this.$("option:selected").val());
            }

        });//End of ServiceType view


        List.AppointmentView = Marionette.ItemView.extend({
            tagName: "tr",
            template: "#appointment-list-item",

            events: {
                'click button.btn-success': "bookAppointment"
            },

            bookAppointment: function (e) {
                e.preventDefault();

                this.trigger("book:appointment", this.model);

            },

            onShow: function () {
                //var appointmentStatus = this.$(".appointmentStart").html();

                var appointmentStatus = this.model.attributes.username;

                if (appointmentStatus == "free") {
                    this.$(".js-book").addClass("btn-success enabled");
                    this.$(".js-book").removeClass("btn-danger disabled");
                }
            }
        });

        List.AppointmentsColelctionView = Marionette.CompositeView.extend({
            template: "#appointment-list",
            tagName: "table",
            className: "table table-hover",
            emptyView: NoAppointmentsView,
            itemView: List.AppointmentView,
            itemViewContainer: "tbody",

            events: {

            }
            //events handling
        });


        var NoAppointmentsView = Marionette.ItemView.extend({
            template: "#appointments-list-none",
            tagName: "tr",
            className: "alert"
        });

    },
    moment
)
;




