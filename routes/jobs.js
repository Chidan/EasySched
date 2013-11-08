var db1 = require("../database/database.js");
var mongojs = require('mongojs');

//Query all jobs
//app.get('/jobs', jobs.allJobs);
exports.allJobs = function (req, res) {
    db1.db.jobs.find({}, function (err, jobs) {
        if (err) {
            res.json(err);
        }
        res.json(jobs);
    });
};


//query for specific job - being requested by frontend
//app.get('/jobs/:id', jobs.oneJob);
exports.oneJob = function (req, res) {
    var jobID = req.params.id;
    setTimeout(function () {

        db1.db.jobs.findOne({_id: mongojs.ObjectId(jobID)}, function (err, job) {
            if (err) {
                res.json(err);
            }
            res.json(job);
        });
    }, 1000);
};


