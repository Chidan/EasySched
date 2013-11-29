var db1 = require("../database/database.js");
var hash = require('./hash');


exports.signup = function (username, password, done) {
    hash(password, function (err, salt, hash) {
        if (err) throw err;
        // if (err) return done(err);
        console.log('inserting into db ' + username + salt + hash);
        db1.db.user.insert({
            username: username,
            salt: salt,
            hash: hash
        }, function (err, user) {
            if (err) throw err;
            // if (err) return done(l
            // err);
            done(null, user);
        });
    });
};


exports.isValidUserPassword = function (username, password, done) {

    db1.db.user.findOne({username: username}, function (err, user) {

        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect email.' });
        hash(password, user.salt, function (err, hash) {
            if (err) {
                return done(err);
            }

            if (arraysIdentical(hash, user.hash.buffer)) {

                console.log("user logon succsessful");

                return done(null, user);
            }
            else {
                done(null, false, {
                    message: 'Incorrect password'
                });
            }
        });
    });
};

var arraysIdentical = function (a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

exports.findOrCreateFaceBookUser = function (profile, done) {
    db1.db.user.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) throw err;
        // if (err) return done(err);
        if (user) {
            done(null, user);
        } else {
            db1.db.user.insert({
                email: profile.emails[0].value,
                facebook: {
                    id: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName
                }
            }, function (err, user) {
                if (err) throw err;
                // if (err) return done(err);
                done(null, user);
            });
        }
    });
};


exports.count = function (username) {
    db1.db.user.findOne({username: username}, function (err, user) {
        if (err) return 1;
        return 0;
    });
};




