/*
 This page will be used for booking appointments, this page will list all the available appointments for a selected
 business
 */

SuperAppManager.module('AdminAppointmentApp.List', function (List, SuperAppManager, Backbone, Marionette, $, _, moment) {

    //defining Layout --> which will hold header panel and appointments in separate views.
    List.Layout = Marionette.Layout.extend({
        template: "#admin-appointment-list-layout",
        //defining regions of layout
        regions: {
            adminPanelRegion: "#admin-appointment-panel-region",
            adminAppointmentsRegion: "#admin-appointments-region"
        }
    });


    List.AdminPanelView = Marionette.ItemView.extend({
        template: "#admin-appointments-panel",

        events: {
            'change select.js-admin-option': 'selectedOption',
            //Below events are fired when 'selectedOption' == 'Manage Appointments'
            'click a.js-pending-appointments': 'pendingAppointments',
            'click a.js-approved-appointments': 'approvedAppointments',
            'click a.js-auto-approved-appointments': 'autoApprovedAppointments',
            'click a.js-rejected-appointments': 'rejectedAppointments'
        },

        //event handlers
        selectedOption: function (e) {
            e.preventDefault(e)
            //this.$(".js-appointments-option").addClass("hidden");
            this.$("div.js-appointments-option").hide();

            switch (this.$("option:selected").val()) {
                case 'Manage Appointments':
                {
                    this.$("div.js-appointments-option").show();
                    this.trigger("appointments:manage");
                }
                    break;
                case 'View Calendar':
                {

                }
                    break;
                case 'Maintain Time-Off':
                {
                    this.trigger('timeOff:maintain');
                }
                    break;
                case 'Maintain User Status':
                {
                    this.trigger('userStatus:maintain');
                }
                    break;
                case 'Create Appointments':
                {
                    this.trigger('appointments:create');
                }
                    break;
                case 'Create Service Type and Service Provider':
                {

                }
                    break;
                case 'Manage Notifications':
                {

                }
                    break;
                case 'Export Calendar':
                {

                }
                    break;

                default:
                {

                }

            }


        },

        pendingAppointments: function (e) {
            e.preventDefault();
            this.trigger('appointments:pending');
        },

        approvedAppointments: function (e) {
            e.preventDefault();
            //hide approve button, When displaying already approved appointments
            this.trigger('appointments:approved');
        },

        autoApprovedAppointments: function (e) {
            e.preventDefault();
            this.trigger('appointments:autoApproved');
        },

        rejectedAppointments: function (e) {
            e.preventDefault();
            this.trigger('appointments:rejected');
        }

    });


    List.AdminAppointmentView = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#admin-appointment-list-item",

        events: {
            'click button.js-show': 'appointmentShow',
            'click button.js-set-trusted-user': 'setTrustedUser',
            'click button.js-approve': 'appointmentApprove',
            'click button.js-reject': 'appointmentReject'
        },

        flash: function (cssClass) {
            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                setTimeout(function () {
                    $view.toggleClass(cssClass)
                }, 500);
            });
        },

        //hiding unwanted buttons (approve button and reject button)
        onShow: function () {
            var appointmentStatus = this.model.attributes.appointmentStatus;

            if (appointmentStatus == "approved") {
                this.$("button.js-approve").hide();
            }
            else if (appointmentStatus == "rejected") {
                this.$("button.js-reject").hide();
            }
            else if (appointmentStatus == "auto approved") {
                this.$("button.js-set-trusted-user").hide();
                this.$("button.js-approve").hide();
            }
        },

        appointmentShow: function (e) {
            e.preventDefault(e)

            this.trigger("appointment:show", this.model);
        },

        setTrustedUser: function (e) {
            e.preventDefault(e)
            this.trigger("user:trust", this.model);
        },

        appointmentApprove: function (e) {
            e.preventDefault(e)

            this.trigger("appointment:approve", this.model);
        },

        appointmentReject: function (e) {
            e.preventDefault(e)

            this.trigger("appointment:reject", this.model);
        }



    });

    List.AdminAppointmentsColelctionView = Marionette.CompositeView.extend({
        template: "#admin-appointment-list",
        tagName: "table",
        className: "table table-hover",
        emptyView: NoAppointmentsView,
        itemView: List.AdminAppointmentView,
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

}, moment);




