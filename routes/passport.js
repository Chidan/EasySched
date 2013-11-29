var db1 = require("../database/database.js");
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var user = require('./user');
var mongojs = require('mongojs');


module.exports = function (passport, config) {


    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });


    passport.deserializeUser(function (id, done) {
        db1.db.user.findOne({ _id: mongojs.ObjectId(id) }, function (err, user) {
            done(err, user);
        });
    });


    passport.use(new LocalStrategy(function (username, password, done) {

        console.log('inside local strategy');
        user.isValidUserPassword(username, password, done);
        console.log(done);

    }));


//    passport.use(new FacebookStrategy({
//            clientID: config.facebook.clientID,
//            clientSecret: config.facebook.clientSecret,
//            callbackURL: config.facebook.callbackURL
//        },
//        function (accessToken, refreshToken, profile, done) {
//            user.findOrCreateFaceBookUser(profile, done);
//        }));

};
