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

    //***********************************************************************
    //***********************************************************************
    //Please modify the whole logic below to get the query string from client,
    //for example to fetch all appointments greater than a particular date
    //cliend should send {$gte:"2013-12-27"} in selectedDate as query string
    //***********************************************************************
    //************************************************************************

    var businessId = req.query.businessId,
        selectedDate = req.query.selectedDate,
        appointmentStatus = req.query.appointmentStatus;


    if ((businessId != "") && (selectedDate != "") && (appointmentStatus == "")) {
        selectedDate = moment(req.query.selectedDate).format("YYYY-MM-DD");
        console.log('logging' + businessId + " --and--  " + selectedDate);
        db1.db.appointments.find({businessId: businessId, appointmentDate: selectedDate}, function (err, appointments) {
            if (err) {
                res.json(err);
            }
            res.json(appointments);
        });

    }
//This querry is coming from business and business wants to find all pending appointments
//starting todays date
    else if ((businessId != "") && (selectedDate == "") && (appointmentStatus != "")) {
        selectedDate = moment().format("YYYY-MM-DD");
        console.log('logging' + businessId + " --and--  " + selectedDate);
        db1.db.appointments.find({ businessId: businessId, appointmentDate: {$gte: selectedDate}, appointmentStatus: appointmentStatus}, function (err, appointments) {
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
}
;

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
            appointmentNote = req.body.appointmentNote,
            appointmentServiceType = req.body.appointmentServiceType,
            appointmentStatus = req.body.appointmentStatus,
            appointmentServiceProvider = req.body.appointmentServiceProvider;

        db1.db.appointments.insert(
            {
                "businessId": businessId,
                "appointmentDate": appointmentDate,
                "username": username,
                "appointmentStart": appointmentStart,
                "appointmentDuration": appointmentDuration,
                "appointmentNote": appointmentNote,
                "appointmentServiceType": appointmentServiceType,
                "appointmentStatus": appointmentStatus,
                "appointmentServiceProvider": appointmentServiceProvider
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
        var AppointmentId = req.body._id,
            businessId = req.body.businessId,
            appointmentDate = req.body.appointmentDate,
            username = req.user.username,
            appointmentStart = req.body.appointmentStart,
            appointmentDuration = req.body.appointmentDuration,
            appointmentNote = req.body.appointmentNote,
            appointmentServiceType = req.body.appointmentServiceType,
            appointmentStatus = req.body.appointmentStatus,
            appointmentServiceProvider = req.body.appointmentServiceProvider;

        db1.db.appointments.update(
            {  _id: mongojs.ObjectId(AppointmentId)},
            {    $set: { businessId: businessId,
                appointmentDate: appointmentDate,
                username: username,
                appointmentStart: appointmentStart,
                appointmentDuration: appointmentDuration,
                appointmentNote: appointmentNote,
                appointmentServiceType: appointmentServiceType,
                appointmentStatus: appointmentStatus,
                appointmentServiceProvider: appointmentServiceProvider}},
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
    }, 0);
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
    }, 0);
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




