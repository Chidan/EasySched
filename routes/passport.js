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


    passport.use(new FacebookStrategy({
            //clientID: config.facebook.clientID,
            //clientSecret: config.facebook.clientSecret,
            //callbackURL: config.facebook.callbackURL

            clientID: '652785881439646',
            clientSecret: '514fb612ccf3ee4b69c4a5b9da3be3ac',
            callbackURL: 'http://localhost:3000/auth/facebook/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            user.findOrCreateFaceBookUser(profile, done);
        }));

    /* passport.use(new GoogleStrategy({
     clientID: config.google.clientID,
     clientSecret: config.google.clientSecret,
     callbackURL: config.google.callbackURL
     },
     function (accessToken, refreshToken, profile, done) {
     profile.authOrigin = 'google';
     User.findOrCreateOAuthUser(profile, function (err, user) {
     return done(err, user);
     });
     }
     ));*/

};
