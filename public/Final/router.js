/*
Notes for Jason:

For some reason add works in aws but not in heroku. Similarly delete works in heroku but not in aws.
I have tried my best throughout the weekend. Here is what I've got:


*/


// Host: w29ifufy55ljjmzq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
// Username: icrhy3geicbf2phb
// Password: c0r6l9d6cz99aoml
// Database: xemupjrbgve6imdc

//Have this running in a bash:
//docker run -p 8081:8080 -e ADMINER_DEFAULT_SERVER=mysql adminer

const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
//const bcrypt = require("bcrypt");
const router = express.Router();

///////////////////////////////////////////////////////////////////

router.get("/", async function(req, res, next){
    let appointments = await getAppointments();
    res.render("../public/Final/views/index", {
        "appointments": appointments
    });
});

router.get("/admin", async function(req, res, next){
    let appointments = await getAppointments();
    if(req.session && req.session.username && req.session.username.length){
        res.render("../public/Final/views/admin", {
            "appointments": appointments
        });
    } else {
        delete req.session.username;
        res.redirect('/Final/login');
    }
});

router.get("/rubric", function(req, res, next){
   res.render("../public/Final/views/rubric"); 
});

router.get("/login", function(req, res, next){
    delete req.session.userId;
    res.render('../public/Final/views/login');
});

router.post("/login", function(req, res, next){
    let successful = false;
    let message = '';
    if(req.body.username === 'admin' && req.body.password === 'admin') {
        successful = true;
        req.session.username = req.body.username;
    } else {
        delete req.session.username;
        message = 'Wrong Username or Password..';
    }
    
    res.json({
        successful: successful,
        message: message
    });
});

router.get("/addAppointmentRequest", async function(req, res) {
    let successful = false;
    let insert = await insertNewAppointment(req.query);
    if(insert.affectedRows == 0){
        res.send(successful);
    } else {
        successful = true;
        res.send(successful);
    }
});

router.get("/editAppointmentRequest", async function(req, res) {
    let successful = false;
    let insert = await editAppointment(req.query);
    if(insert.affectedRows == 0){
        res.send(successful);
    } else {
        successful = true;
        res.send(successful);
    }
});

router.get("/deleteAppointmentRequest", async function(req, res) {
    let successful = false;
    let insert = await deleteAppointment(req.query);
    if(insert.affectedRows == 0){
        res.send(successful);
    } else {
        successful = true;
        res.send(successful);
    }
});


////////////////////////////////////////////////////////////////

function insertNewAppointment(query) {
    let dateOf = query.dateOf;
    let startTime = query.startTime;
    let endTime = query.endTime;
    let bookedBy = query.bookedBy;

    let conn = dbConnection();
    return new Promise(function (resolve, reject) {
        conn.connect(function (err) {
            if (err) throw err;

            let params = [dateOf, startTime, endTime, bookedBy];
            let sql = 'INSERT INTO \`final_scheduler\` (dateOf, startTime, endTime, bookedBy) VALUES (?, ?, ?, ?);';

            conn.query(sql, params, function (err, result) {
                if (err) throw err;
                conn.end();
                resolve(result);
            });
        });//connect
    });//promise
}

function editAppointment(query) {
    let dateOf = query.dateOf;
    let startTime = query.startTime;
    let endTime = query.endTime;
    let bookedBy = query.bookedBy;
    let appointmentId = query.appointmentId;

    let conn = dbConnection();
    return new Promise(function (resolve, reject) {
        conn.connect(function (err) {
            if (err) throw err;

            let params = [dateOf, startTime, endTime, bookedBy, appointmentId];
            let sql = `UPDATE \`final_scheduler\` u
                       SET u.dateOf = ?, u.startTime = ?, u.endTime = ?, u.bookedBy =  ? 
                       WHERE u.appointmentId = ? 
                       ;
                       `;

            conn.query(sql, params, function (err, result) {
                if (err) throw err;
                conn.end();
                resolve(result);
            });
        });//connect
    });//promise
}

function deleteAppointment(query) {
    // let dateOf = query.dateOf;
    // let startTime = query.startTime;
    // let endTime = query.endTime;
    // let bookedBy = query.bookedBy;
    let appointmentId = query.appointmentId;

    let conn = dbConnection();
    return new Promise(function (resolve, reject) {
        conn.connect(function (err) {
            if (err) throw err;

            let params = [appointmentId];
            let sql = `DELETE FROM \`final_scheduler\` WHERE appointmentId = ?;`;

            conn.query(sql, params, function (err, result) {
                if (err) throw err;
                conn.end();
                resolve(result);
            });
        });//connect
    });//promise
}

function getAppointments(query){
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw err;
            console.log("Successfully connected to the database!");
            
            let sql = `SELECT appointmentId, dateOf, startTime, endTime, bookedBy FROM final_scheduler`;
            
            conn.query(sql, function(err, rows, fields){
                if(err) throw err;
                resolve(rows);
            });
        });//connect
    });//promise
    
}

function dbConnection(){
    
    let conn = mysql.createConnection({
        host: "w29ifufy55ljjmzq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "icrhy3geicbf2phb",
        password: "c0r6l9d6cz99aoml",
        database: "xemupjrbgve6imdc"
    });//createConnection
    
    return conn;
}

module.exports = router;