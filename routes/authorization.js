var user = require('./user');



exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
};


exports.userExist = function (req, res, next) {
    user.count({ username: req.body.username }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            res.redirect("/signup");
        }
    });
};