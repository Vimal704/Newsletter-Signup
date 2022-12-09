const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { post } = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("css&image"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    var fname = req.body.fName;
    var lname = req.body.lName;
    var email = req.body.email;
   var data ={
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: fname,
                LNAME: lname
            }
        }
    ]
   };
   var jsonData = JSON.stringify(data);
   const url = "https://us21.api.mailchimp.com/3.0/lists/44eade7ad7"
   const options={
    method:"POST",
    auth:"working:1479c757d92fc136f4b9a2e350fa2646-us21"
   }
   var error_count=1;
   const request = https.request(url, options,function(response){
    response.on("data",function(data){
        console.log(JSON.parse(data))
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

    });
   });
   request.write(jsonData);
   request.end();
});
app.post("/failure",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.listen(3000,function(){
    console.log("Server is running port 3000");
})
//API key
//1479c757d92fc136f4b9a2e350fa2646-us21

//audience Id
//44eade7ad7