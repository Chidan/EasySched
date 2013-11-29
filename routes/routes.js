var user = require('./user');
var auth = require('./authorization.js');

module.exports = function (app, passport) {

//---------------------------------------------------------------------------------------------
//Defining everything all routes about passport
//---------------------------------------------------------------------------------------------

//For now just jumping irrespective of whether user is authenticated or not
    app.get("/", function (req, res, next) {
        if (req.isAuthenticated()) {
            //res.render("home", { user: req.user});
            next();
        } else {
            //res.render("index", { user: null});
            next();
        }
    });


    app.post("/login", passport.authenticate('local'),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.

            res.json({"login": "successful"});
        });
    /*
     app.post("/login", passport.authenticate('local', function (req, res) {

     res.send({ some: 'json' });
     //res.redirect("contacts");

     })
     );*/


//for time being not checking whether the user already exists on DB -"auth.userExist"
//
//auth.userExist
    app.post("/signup", function (req, res, next) {
        user.signup(req.body.username, req.body.password, function (err, user) {
            if (err) throw err;
            //For now not logging in user automatically once the user signs up
            /* req.login(user, function (err) {
             if (err) return next(err);
             return res.redirect("profile");
             });*/
            console.log('new user created');
            res.json(user);
        });
    });

    /*
     app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email"}));

     app.get("/auth/facebook/callback",
     passport.authenticate("facebook", { failureRedirect: '/login'}),
     function (req, res) {
     res.render("profile", {user: req.user});
     }
     );
     */


    app.get('/logout', function (req, res) {
        if (req.isAuthenticated()) {
            var user = req.user;
            req.logout();
            res.json({"user": user.username});
        }
        else
        {
            res.json({"user": "NoUser"});
        }

    });

};