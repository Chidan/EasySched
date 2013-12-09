/**
 * Module dependencies.
 */

var express = require('express');
var passport = require("passport");
//var LocalStrategy = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;


var routes = require('./routes');
var appointments = require('./routes/appointments');
var jobs = require('./routes/jobs');
var business = require('./routes/business');
var user = require('./routes/user');
var config = require('./routes/config');
var auth = require('./routes/authorization.js');


var http = require('http');
var path = require('path');

require('./routes/passport')(passport, config);


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.engine('html', require('ejs').renderFile);
//app.engine('.ejs', require('ejs').__express);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
//Handling errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', { error: err });
});

app.use(function (req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }
    res.type('txt').send('Not found');
});



//Starting EasySched project
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//Routes for user authentication
//---------------------------------------------------------------------------------------------


require('./routes/routes')(app, passport);

//---------------------------------------------------------------------------------------------

//app.get('/', routes.index);
//app.get('/users', user.list);
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//Routes for getting "select * on all tables in db"
//---------------------------------------------------------------------------------------------
//responding to requests (routes) - get, post, put, delete - CRUD
app.get('/', appointments.index);
//code to send the html static content
//app.get('/', function(req, res) {
//    res.sendfile(__dirname + '/views/ind.html');
//});


//query all business
app.get('/business', appointments.allBusiness);
//query all businessBranches
app.get('/businessBranches', appointments.allBusinessBranches);
//query all businessCalendar
app.get('/businessCalendar', appointments.allBusinessCalendar);
//query all userAffiliationh
app.get('/userAffiliation', appointments.allUserAffiliation);
//query all users
app.get('/users', appointments.allUsers);

//---------------------------------------------------------------------------------------------
//Routes for all contacts/users
//---------------------------------------------------------------------------------------------
//query all users - being requested by frontend
app.get('/contacts', appointments.allContacts);
//query for specific contact - being requested by frontend
app.get('/contacts/:id', appointments.oneContact);
//Saving edited contact
app.put('/contacts/:id', appointments.editContact);
//Creating new contact
app.post('/contacts', appointments.createContact);
//Deleting contact
app.delete('/contacts/:id', appointments.deleteContact);

//---------------------------------------------------------------------------------------------
//Routes for jobs
//---------------------------------------------------------------------------------------------
//Query all jobs
app.get('/jobs', jobs.allJobs);
//query for specific job - being requested by frontend
app.get('/jobs/:id', jobs.oneJob);

//---------------------------------------------------------------------------------------------
//Routes for business
//---------------------------------------------------------------------------------------------
//register new business
app.post('/business', business.newBusiness);
app.get('/business', business.allBusiness);
//query for specific job - being requested by frontend
app.get('/business/:id', business.oneBusiness);

//---------------------------------------------------------------------------------------------
//Routes for appointments
//---------------------------------------------------------------------------------------------
//query all appointments and also specific dates
app.get('/appointments', appointments.allAppointments);
//Save a specific appointment
app.post('/appointments', appointments.saveAppointment);
app.put('/appointments/:id', appointments.updateAppointment);

//---------------------------------------------------------------------------------------------
//Routes for inserting data into db
//---------------------------------------------------------------------------------------------
//query all appointments and also specific dates
app.get('/dbinsert', business.dbInsert);
//query appointments for specific business and date



//---------------------------------------------------------------------------------------------
//Starting server and listening on port 8001
//---------------------------------------------------------------------------------------------
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


//App ID:	652785881439646
//App Secret:	514fb612ccf3ee4b69c4a5b9da3be3ac