const express = require("express");
const mysql = require("mysql");
const app = express();
app.set("view.engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

//routes
app.get("/", async function(req, res){
    
    let categories = await getCategories();
    console.log(categories);
    
    res.render("index.ejs", {"categories":categories});
    
});//root

app.get("/quotes", async function(req, res){
    
    let rows = await getQuotes(req.query);
    
    res.render("quotes.ejs", {"records":rows});
    
});//quotes

function getQuotes(query){
    
    let keyword = query.keyword;
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw err;
            console.log("Connected!");
            
            let sql = `SELECT quote, firstName, lastName, category FROM l9_quotes
                        NATURAL JOIN l9_author
                        WHERE
                        quote LIKE '%${keyword}%'`;
                        
            if (category){ //if the user selected a quote category
                
                sql += ` AND category = '${category}'`;
            }
            
            conn.query(sql, function(err, rows, fields){
                if(err) throw err;
                //res.send(rows);
                resolve(rows);
            });
        });//connect
    });//promise
}//getQuotes

function getCategories(){
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err){
            if(err) throw err;
            console.log("Connected!");
            
            let sql = `SELECT DISTINCT category FROM l9_quotes
                        ORDER BY category`;
            
            conn.query(sql, function(err, rows, fields){
                if(err) throw err;
                //res.send(rows);
                resolve(rows);
            });
        });//connect
    });//promise
}//getCategories

app.get("/dbTest", async function(req, res){
    
    let conn = dbConnection();
    
    conn.connect(function(err){
        if(err) throw err;
        console.log("Connected!");
        
        let sql = "SELECT * FROM l9_author WHERE sex = 'F'";
        
        conn.query(sql, function(err, rows, fields){
            if(err) throw err;
            res.send(rows);
        });
    });
    
});//dbTest

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("Express server is running...");
    
});

function dbConnection(){
    
    let conn = mysql.createConnection({
        host: "w29ifufy55ljjmzq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "icrhy3geicbf2phb",
        password: "c0r6l9d6cz99aoml",
        database: "xemupjrbgve6imdc"
    });//createConnection
    
    return conn;
}