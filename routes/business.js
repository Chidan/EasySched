var db1 = require("../database/database.js");
var mongojs = require('mongojs');
var moment = require('moment');


//register new business
//app.post('/business', business.newBusiness);

exports.newBusiness = function (req, res) {

    if (req.isAuthenticated()) {
        //res.json({ "user": req.user.username});


        var businessName = req.body.businessName,
            username = req.user.username,
            businessCategory = req.body.businessCategory,
            businessAdress = req.body.businessAddress;

        db1.db.business.insert(
            {
                "businessName": businessName,
                "username": username,
                "businessCategory": businessCategory,
                "businessAddress": businessAdress

            }, function (err, business) {
                if (err) {
                    res.json(err);
                }
                res.json(business);
            });

    }
    else {
        res.json({"login": "failed"});
    }

};

//Query all businesses
//app.get('/business', business.allBusiness);
exports.allBusiness = function (req, res) {
    setTimeout(function () {


        db1.db.business.find({}, function (err, business) {
            if (err) {
                res.json(err);
            }
            res.json(business);
        });
    }, 2000);
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
    }, 2000);
};


//app.get('/dbinsert', business.dbInsert);
exports.dbInsert = function (req, res) {

    var a =

        [
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "08:00",
                "appointmentDuration": "01:00"
            },
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "09:00",
                "appointmentDuration": "01:00"
            },
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "10:00",
                "appointmentDuration": "01:00"
            },
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "11:00",
                "appointmentDuration": "01:00"
            },
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "12:00",
                "appointmentDuration": "01:00"
            },
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "13:00",
                "appointmentDuration": "01:00"
            },
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "14:00",
                "appointmentDuration": "01:00"
            },
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "15:00",
                "appointmentDuration": "01:00"
            },
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "16:00",
                "appointmentDuration": "01:00"
            },
            {
                "businessId": "5275856069742608f024e91b", //GlobalS pa
                "appointmentDate": moment(new Date(2013, 10, 28)).format("YYYY-MM-DD"),
                "userName": "free", //deepak
                "appointmentStart": "17:00",
                "appointmentDuration": "01:00"
            }
        ];


    db1.db.appointments.insert(a, function (err, a) {
        if (err) {
            console.log(err);
        }
        console.log(a);

    });

};
