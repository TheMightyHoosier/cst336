const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

const request = require('request');

//routes
app.get("/", async function(req, res){
    
 let parsedData = await getImages("otters");
 
 console.dir("parsedData: " + parsedData); //displays content of the object
    
 res.render("index", {"image":parsedData.hits[0].largeImageURL});
            
}); //root route


app.get("/results", async function(req, res){
    
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    let orientation = req.query.orientation;
    
    let parsedData = await getImages(keyword, orientation);
    
    // let r1 = Math.floor(Math.random() * 4);
    // let r2 = Math.floor(Math.random() * 5);
    // let r3 = Math.floor(Math.random() * 5);
    // let r4 = Math.floor(Math.random() * 5);

    res.render("results", {"images":parsedData});
    
});//results route


//Returns all data from the Pixabay API as JSON format
function getImages(keyword, orientation){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=13944946-19a9f2fa6c30e8ce9ea1ae987&q='+keyword+'&orientation='+orientation,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
                // let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                // res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                // res.render("index", {"image":parsedData.hits[randomIndex].largeImageURL});
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});