const express = require("express");
const app = express();
app.engine("html", require('ejs').renderFile);
app.use(express.static("public"));

//routes
app.get("/", function(req, res){
    res.render("index.html");
});

app.get("/mercury", function(req, res){
    res.send("This will be a Mercury web page!");
});

app.get("/venus", function(req, res){
    res.send("This will be a Venus web page!");
});

//server listener
app.listen("8080", "0.0.0.0", function(){
    console.log("Express Server is Running...");
});

//Finished off on page 7