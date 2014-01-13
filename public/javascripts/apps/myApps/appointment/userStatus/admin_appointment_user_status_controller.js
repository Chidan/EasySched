SuperAppManager.module('AdminAppointmentApp.TrustedUser', function (TrustedUser, SuperAppManager, Backbone, Marionette, $, _, moment) {

    TrustedUser.Controller = {

        listTrustedUser: function (adminAppointmentsListLayout) {

            var fetchingTrustedUsers =
                SuperAppManager.request("business:trustedUser", SuperAppManager.loggedInUser.get("_id"));

            $.when(fetchingTrustedUsers).done(function (trustedUsers) {

                //Instantiating view, this will also render our collection
                trustedUserCollectionView = new TrustedUser.TrustedUserCollectionView({  collection: trustedUsers});


                trustedUserCollectionView.on("itemview:user:unTrust", function (childView, model) {

                    /*         var data = {};
                     data['businessId'] = model.get('businessId');
                     data['customerUserName'] = model.get('username');

                     $.ajax({
                     type: "POST",
                     url: '/appointment/unTrustUser',
                     data: data,
                     dataType: "json",
                     cache: false,
                     success: function (trustedUsers) {
                     alert('User status not trusted anymore');
                     childView.render();
                     //childView.flash("success");
                     },
                     error: function (jqXHR, textStatus, errorThrown) {
                     alert('error ' + textStatus + " " + errorThrown);
                     }
                     });*/

                    model.save(trustedUsers, {
                        success: function (model, response) {
                            trustedUsers = response;
                            childView.render();
                            //childView.flash("success");
                            SuperAppManager.Flash.success('user status updated');
                        },
                        error: function () {
                            SuperAppManager.Flash.error("Appointment update failed");
                        }
                    })

                });

                adminAppointmentsListLayout.adminAppointmentsRegion.show(trustedUserCollectionView);
            });

        }
    }

})
;