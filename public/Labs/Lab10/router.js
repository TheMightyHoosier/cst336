// Host: w29ifufy55ljjmzq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
// Username: icrhy3geicbf2phb
// Password: c0r6l9d6cz99aoml
// Database: xemupjrbgve6imdc

//Have this running in a bash:
//docker run -p 8081:8080 -e ADMINER_DEFAULT_SERVER=mysql adminer

const express = require("express");
const mysql = require("mysql");
const router = express.Router();

////////////////////////////////////////////////////////////////////

//routes
router.get("/", async function(req, res, next){
    
    let authors = await getAuthors();
    res.render("../public/Labs/Lab10/index", {"authors":authors});
    
});//root

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