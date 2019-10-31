const express = require("express");
const faker = require("faker");
const app = express();
app.engine("html", require('ejs').renderFile);
app.use(express.static("public"));

//routes
app.get("/", function(req, res){
    var randomName = faker.name.findName();
    console.log("This is " + randomName);
    res.render("index.html", { Title: randomName});
});

app.get("/igneous", function(req, res){
    var randomName = faker.name.findName();
    console.log("This is " + randomName);
    res.render("igneous.html", { Title: randomName});
});

app.get("/sedimentary", function(req, res){
    var randomName = faker.name.findName();
    console.log("This is " + randomName);
    res.render("sedimentary.html", { Title: randomName});
});

app.get("/metamorphic", function(req, res){
    var randomName = faker.name.findName();
    console.log("This is " + randomName);
    res.render("metamorphic.html", { Title: randomName});
});

//server listener
app.listen("8080", "0.0.0.0", function(){
    console.log(" Your Express Server is Running...");
});