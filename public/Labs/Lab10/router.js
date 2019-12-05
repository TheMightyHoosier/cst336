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

////////////////////////////////////////////////////////////////////

// router.use(session({
//     secret:"top secret!",
//     resave:true,
//     saveUninitialized:true
// }));

// router.use(express.urlencoded({
//     extended:true
// }));//To be able to parse POST parameters

////////////////////////////////////////////////////////////////////

//routes

router.get("/login", async function(req, res, next){
    
    res.render("../public/Labs/Lab10/login");
    
});

router.post("/login", function(req, res, next){
    
    //console.log("Inside router post");
   
   //TODO: Do something to log in...
   let successful = false;
   let message = '';
   if(req.body.username === 'hello' && req.body.password === 'world') {
       successful = true;
       req.session.username = req.body.username;
   } else {
       delete req.session.username;
       message = 'Wrong username or password...';
   }
   
   //console.log("req.body: ", req.body);
   
   //Return success or failure
   res.json({
       successful: successful,
       message: message
   });
    
});

router.get("/admin", async function(req, res, next){
    
    let authors = await getAuthors();
    
    if(req.session && req.session.username && req.session.username.length) {
        res.render("../public/Labs/Lab10/admin", {
            username: req.session.username,
            "authors":authors
        });
    } else {
        delete req.session.username;
        res.redirect('/Labs/Lab10/login');
    }
    
    
});//admin page

router.get("/addAuthor", async function(req, res, next){
    
    if(req.session && req.session.username && req.session.username.length) {
        res.render("../public/Labs/Lab10/addAuthor", {
            username: req.session.username,
        });
    } else {
        delete req.session.username;
        res.redirect('/Labs/Lab10/login');
    }
    
    
});//addAuthor page

////////////////////////////////////////////////////////////////////

function getAuthors(query){
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw err;
            console.log("Successfully connected to the database!");
            
            let sql = `SELECT authorId, firstName, lastName, dob, dod, sex FROM l9_author`;
            
            conn.query(sql, function(err, rows, fields){
                if(err) throw err;
                resolve(rows);
            });
        });//connect
    });//promise
    
}//getAuthors

////////////////////////////////////////////////////////////////////

function dbConnection(){
    
    let conn = mysql.createConnection({
        host: "w29ifufy55ljjmzq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "icrhy3geicbf2phb",
        password: "c0r6l9d6cz99aoml",
        database: "xemupjrbgve6imdc"
    });//createConnection
    
    return conn;
}

////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

module.exports = router;