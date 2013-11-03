var db1 = require("../database/database.js");
var mongojs = require('mongojs');


//Query all businesses
//app.get('/business', business.allBusiness);
exports.allBusiness = function (req, res) {
    db1.db.business.find({}, function (err, business) {
        if (err) {
            res.json(err);
        }
        res.json(business);
    });
};


//query for specific business - being requested by frontend
//app.get('/business/:id', business.oneBusiness);
exports.oneBusiness = function (req, res) {
    var businessID = req.params.id;
    setTimeout(function () {

        db1.db.business.findOne({_id: mongojs.ObjectId(businessID)}, function (err, job) {
            if (err) {
                res.json(err);
            }
            res.json(job);
        });
    }, 1000);
};
