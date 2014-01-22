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

        idAttribute: "_id",

        validation: {
            email: {
                required: true,
                pattern: 'email'
            },
            password: {
                minLength: 8
            }
        }

    });

    Entities.LoginUser = Backbone.Model.extend({
        urlRoot: "login"

    });

    });

