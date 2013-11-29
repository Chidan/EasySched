var db1 = require("../database/database.js");
var mongojs = require('mongojs');
/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Taskimos', user: req.user });


};


//app.get('/appointments', appointments.allAppointments);
//Fetching all appointments
//1.Query all appointments
//2. set response
exports.allAppointments = function (req, res) {
    var businessId = req.query.businessId,
        selectedDate = moment(req.query.selectedDate).format("YYYY-MM-DD");


    console.log('logging' + businessId + " --and--  " + selectedDate);

    if ((businessId != undefined) && (selectedDate != undefined)) {

        db1.db.appointments.find({businessId: businessId, appointmentDate: selectedDate}, function (err, appointments) {
            if (err) {
                res.json(err);
            }
            res.json(appointments);
        });
    }

    else {
        db1.db.appointments.find({}, function (err, appointments) {
            if (err) {
                res.json(err);
            }
            res.json(appointments);
        });
    }
};

//app.post('/appointments', appointments.saveAppointment);
exports.saveAppointment = function (req, res) {

    console.log(req.body);


    if (req.isAuthenticated()) {
        //res.json({ "user": req.user.username});

        var businessId = req.body.businessId,
            appointmentDate = req.body.appointmentDate,
            username = req.user.username,
            appointmentStart = req.body.appointmentStart,
            appointmentDuration = req.body.appointmentDuration,
            appointmentNote = req.body.appointmentNote;

        db1.db.appointments.insert(
            {
                "businessId": businessId,
                "appointmentDate": appointmentDate,
                "userName": username,
                "appointmentStart": appointmentStart,
                "appointmentDuration": appointmentDuration,
                "appointmentNote": appointmentNote
            },
            function (err, appointment) {
                if (err) {
                    res.json(err);
                }
                res.json(appointment);
            });

    }
    else {
        res.json({"login": "failed"});
    }


};

//app.post('/appointments', appointments.updateAppointment);
exports.updateAppointment = function (req, res) {

    if (req.isAuthenticated()) {
        res.json({ "user": req.user});
    }
    else {
        res.json({"login": "failed"});
    }
};

//app.get('/appointments/:businessId/:selectedDate', appointments.specificAppointments);
exports.specificAppointments = function (req, res) {

    var businessId = req.params.businessId,
        selectedDate = req.params.selectedDate;

    console.log('businessId = ' + businessId + '   /seleceted Date = ' + selectedDate);

};


//app.get('/business', appointments.allBusiness);
exports.allBusiness = function (req, res) {
    db1.db.business.find({}, function (err, appointments) {
        if (err) {
            res.json(err);
        }
        res.json(appointments);
    });
};

//app.get('/businessBranches', appointments.allBusinessBranches);
exports.allBusinessBranches = function (req, res) {
    db1.db.businessBranches.find({}, function (err, appointments) {
        if (err) {
            res.json(err);
        }
        res.json(appointments);
    });
};

//app.get('/businessCalendar', appointments.allBusinessCalendar);
exports.allBusinessCalendar = function (req, res) {
    db1.db.businessCalendar.find({}, function (err, appointments) {
        if (err) {
            res.json(err);
        }
        res.json(appointments);
    });
};

//app.get('/userAffiliation', appointments.allUserAffiliation);
exports.allUserAffiliation = function (req, res) {
    db1.db.userAffiliation.find({}, function (err, appointments) {
        if (err) {
            res.json(err);
        }
        res.json(appointments);
    });
};

//app.get('/users', appointments.allUsers);
exports.allUsers = function (req, res) {
    db1.db.users.find({}, function (err, appointments) {
        if (err) {
            res.json(err);
        }
        res.json(appointments);
    });
};

//app.get('/contacts', appointments.allContacts);
exports.allContacts = function (req, res) {
    setTimeout(function () {
        db1.db.users.find({}, function (err, appointments) {
            if (err) {
                res.json(err);
            }
            res.json(appointments);
        });
    }, 1000);
};


//query for specific contact - being requested by frontend
//app.get('/contacts/:id', appointments.oneContact);
exports.oneContact = function (req, res) {
    var contactID = req.params.id;
    setTimeout(function () {

        db1.db.users.findOne({_id: mongojs.ObjectId(contactID)}, function (err, appointments) {
            if (err) {
                res.json(err);
            }
            res.json(appointments);
        });
    }, 1000);
};


//Saving edited contact
//app.put('/contacts/:id', appointments.editContact);
exports.editContact = function (req, res) {
    var contactID = req.body._id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phoneNumber = req.body.phoneNumber;

    db1.db.users.update(
        {  _id: mongojs.ObjectId(contactID)},
        {    $set: { firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber }},
        function (err, contact) {

            if (err) {
                res.json(err);
            }
            res.json(contact);
        });
};

//Creating new contact
//app.post('/contacts/:id', appointments.editContact);
exports.createContact = function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phoneNumber = req.body.phoneNumber;

    db1.db.users.insert(
        { firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber },
        function (err, contact) {
            if (err) {
                res.json(err);
            }
            res.json(contact);
        });
};


//Deleting contact
//app.delete('/contacts/:id', appointments.deleteContact);
exports.deleteContact = function (req, res) {
    var contactID = req.params.id;
    console.log(contactID);
    db1.db.users.remove({  _id: mongojs.ObjectId(contactID)});
};


/*res.json(
 [
 { _id: 1, firstName: 'Alice_db', lastName: 'Arten',
 phoneNumber: '555-0184' },
 { _id: 2, firstName: 'Bob_db', lastName: 'Brigham',
 phoneNumber: '555-0163' },
 { _id: 3, firstName: 'Charlie_db', lastName: 'Campbell',
 phoneNumber: '555-0129' }
 ]
 )
 };*/




