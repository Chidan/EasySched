
/**
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes');
var appointments = require('./routes/appointments');
//var user = require('./routes/user');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);
//---------------------------------------------------------------------------------------------
//Starting Library project
//---------------------------------------------------------------------------------------------
//responding to requests (routes) - get, post, put, delete - CRUD
app.get('/', appointments.index);

//query all appointments
app.get('/appointments', appointments.allAppointments);
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




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
