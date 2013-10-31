//connecting to db

var dbUrl = "appointments";
var collections = ["appointments", "business", "businessBranches", "businessCalendar", "userAffiliation", "users"];
var db = require("mongojs").connect(dbUrl, collections);
exports.db = db;


