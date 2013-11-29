SuperAppManager.module('Entities', function (Entities, SuperAppManager, Backbone, Marionette, $, _) {
    //Model
    Entities.User = Backbone.Model.extend({
        urlRoot: "signup",

        defaults: {
            firstName:  '',
            lastName:   '',
            username:      '',
            password: '',
            salt:       '',
            hash:       '',
            facebook:{
                id:       '',
                email:    '',
                name:     ''
            },
            twitter:{
                id:       '',
                email:    '',
                name:     ''
            }
        },

        idAttribute: "_id"

    });

    Entities.LoginUser = Backbone.Model.extend({
        urlRoot: "login"

    });

    });

