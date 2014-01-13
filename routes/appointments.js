var db1 = require("../database/database.js");
var mongojs = require('mongojs');
/*
 * GET home page.
 */

exports.index = function (req, res) {
    //res.render('index', { title: 'Taskimos', user: req.user });
    res.render('index');


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
        appointmentStatus = req.query.appointmentStatus,
        serviceType = req.query.serviceType,
        serviceProvider = req.query.serviceProvider;


    if ((businessId != "") && (selectedDate != "") && (appointmentStatus == "")) {
        selectedDate = moment(req.query.selectedDate).format("YYYY-MM-DD");
        console.log('logging' + businessId + " --and--  " + selectedDate);
        db1.db.appointments.find({businessId: businessId, appointmentDate: selectedDate, serviceType: serviceType, serviceProvider: serviceProvider}, function (err, appointments) {
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
        //username = req.body.username,
            username = req.user.username,
            appointmentStart = req.body.appointmentStart,
            appointmentDuration = req.body.appointmentDuration,
            appointmentNote = req.body.appointmentNote,
            serviceType = req.body.serviceType,
        //appointmentStatus = req.body.appointmentStatus,
            appointmentStatus = 'pending',
            serviceProvider = req.body.serviceProvider;

        db1.db.businessTrustedUsers.find({customerUserName: username}, function (err, trustedUser) {
            //User is not a trusted user, hence save appointment status as pending
            if (trustedUser.length != 0) {
                appointmentStatus = 'auto approved';
            }

            db1.db.appointments.insert(
                {
                    "businessId": businessId,
                    "appointmentDate": appointmentDate,
                    "username": username,
                    "appointmentStart": appointmentStart,
                    "appointmentDuration": appointmentDuration,
                    "appointmentNote": appointmentNote,
                    "serviceType": serviceType,
                    "appointmentStatus": appointmentStatus,
                    "serviceProvider": serviceProvider
                },
                function (err, appointment) {
                    if (err) {
                        res.json(err);
                    }
                    res.json(appointment);
                });

        });

    }
    else {
        res.json({"login": "failed"});
    }
};

//check if the user is already loogedIn
//app.get('/loggedIn', appointments.checkLoggedIn);
exports.checkLoggedIn = function (req, res) {
    if (req.isAuthenticated()) {
        var username = req.user.username;

        db1.db.business.findOne({username: username}, function (err, business) {
            if (err) {
                res.json(err);
            }
            if (business != null) {
                res.json(business);
            }
            else {
                res.json({"username": username  });
            }
        });
    }
    else {
        res.json({"login": "failed"});
    }
};

//app.get('/getTimeOffDates', appointments.getTimeOffDates);
exports.getTimeOffDates = function (req, res) {

    var businessId = req.query.businessId;
    db1.db.businessTimeOff.find({businessId: businessId, allDay: true}, { timeOffDate: 1, _id: 0 }, function (err, holidays) {
        if (err) {
            res.json(err);
        }
        res.json(holidays);
    })
};


//app.post('/appointments', appointments.updateAppointment);
exports.updateAppointment = function (req, res) {

    if (req.isAuthenticated()) {
        var AppointmentId = req.body._id,
            businessId = req.body.businessId,
            appointmentDate = req.body.appointmentDate,
            username = req.body.username,
        //username = req.user.username,
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

//set user as trusted
//app.post('/appointment/trustUser', appointments.trustUser);

exports.trustUser = function (req, res) {

    if (req.isAuthenticated()) {

        var businessId = req.body.businessId,
            businessUserName = req.user.username,
            customerUserName = req.body.customerUserName;

        db1.db.businessTrustedUsers.insert(
            {
                "businessId": businessId,
                "businessUserName": businessUserName,
                "customerUserName": customerUserName
            },
            function (err, trustedUser) {
                if (err) {
                    res.json(err);
                }
                res.json(trustedUser);
            });

    }
    else {
        res.json({"login": "failed"});
    }

};


//app.post('/appointment/trustUser', appointments.unTrustUser);

exports.unTrustUser = function (req, res) {
    if (req.isAuthenticated()) {

        var _id = req.body._id;
        db1.db.businessTrustedUsers.remove({_id: mongojs.ObjectId(_id)}, function (err, trustedUser) {
            if (err) {
                res.json(err);
            }
            //res.json(trustedUser);
            db1.db.businessTrustedUsers.find({}, function (err, trustedUsers) {
                if (err) {
                    res.json(err);
                }
                res.json(trustedUsers);
            })
        });
    }
    else {
        res.json({"login": "failed"});
    }
};

//Save TimeOff for business
//app.post('/timeOff', appointments.timeOff);
exports.timeOff = function (req, res) {
    if (req.isAuthenticated()) {
        var businessId = req.body.businessId,
            timeOffDate = req.body.timeOffDate,
            startTime = req.body.startTime,
            endTime = req.body.endTime,
            allDay = req.body.allDay,
            specialNote = req.body.specialNote,
            timeOffRepeat = req.body.timeOffRepeat;

        db1.db.businessTimeOff.insert(
            {
                "businessId": businessId,
                "timeOffDate": timeOffDate,
                "startTime": startTime,
                "endTime": endTime,
                "allDay": allDay,
                "specialNote": specialNote,
                "timeOffRepeat": timeOffRepeat
            },
            function (err, timeOff) {
                if (err) {
                    res.json(err);
                }
                res.json(timeOff);
            });
    }
    else {
        res.json({"login": "failed"});
    }

};

//app.post('/serviceTypeProvider', appointments.serviceTypeProvider);
exports.serviceTypeProvider = function (req, res) {
    if (req.isAuthenticated()) {
        var businessId = req.body.businessId,
            serviceType = req.body.serviceType,
            serviceProvider = req.body.serviceProvider;

        db1.db.businessServiceTypeProvider.insert(
            {
                "businessId": businessId,
                "serviceType": serviceType,
                "serviceProvider": serviceProvider
            },
            function (err, serviceTypeProvider) {
                if (err) {
                    res.json(err);
                }
                res.json(serviceTypeProvider);
            });
    }
    else {
        res.json({"login": "failed"});
    }
};

//app.get('/serviceTypeProvider', appointments.getServiceTypeProvider);
exports.getServiceTypeProvider = function (req, res) {
    var businessId = req.query.businessId,
        serviceTypeProviderOption = req.query.serviceTypeProviderOption,
        serviceTypeProviderValue = req.query.serviceTypeProviderValue;

    if (serviceTypeProviderOption == 'serviceTypes') {
        console.log('serviceTypeProviderValue: ' + serviceTypeProviderValue)
        db1.db.businessServiceTypeProvider.find({businessId: businessId}, function (err, serviceTypesProviders) {
            if (err) {
                res.json(err);
            }

            res.json(serviceTypesProviders);
        });
    }
    else if (serviceTypeProviderOption == 'serviceProviders') {
        console.log('serviceTypeProviderValue: ' + serviceTypeProviderValue)
        db1.db.businessServiceTypeProvider.find({businessId: businessId, serviceType: serviceTypeProviderValue }, function (err, serviceProviders) {
            if (err) {
                res.json(err);
            }

            res.json(serviceProviders);
        });
    }


};


//app.get('userStatus', appointments.userStatus);
exports.userStatus = function (req, res) {

    if (req.isAuthenticated()) {
        var businessId = req.query.businessId;
        db1.db.businessTrustedUsers.find({businessId: businessId}, function (err, trustedUsers) {
            if (err) {
                res.json(err);
            }

            res.json(trustedUsers);
        })
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




