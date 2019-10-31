const express = require("express");
const faker = require("faker");
const app = express();
app.engine("html", require('ejs').renderFile);
app.use(express.static("public"));

//routes
app.get("/", function(req, res){
    res.render("index.html");
});

app.get("/igneous", function(req, res){
    res.render("igneous.html");
});

app.get("/sedimentary", function(req, res){
    res.render("sedimentary.html");
});

app.get("/metamorphic", function(req, res){
    res.render("metamorphic.html");
});

//server listener
app.listen("8080", "0.0.0.0", function(){
    console.log(" Your Express Server is Running...");
});