// npm i mongoose --save -->> To connect the database with nodejs
// npm i express --save -->> To build the API's
// npm i cookie-parser --save  -->>  cookie-parser is a middleware for Node.js web applications that parses cookies attached to incoming HTTP requests. Cookies are small text files that are stored on the client-side (i.e., in the user's browser) and are used to store user data or session information.

const express = require("express");
const mongoose = require("mongoose");
const app = express(); // app means executable function for express.js
const jwtHelper = require("./util/jwthelper.js");
const User = require("./model/userModel");
const cookieParser = require("cookie-parser");

// By The Help of Mongoose We connect to our Database
mongoose.connect("mongodb://127.0.0.1:27017/JWTtoken").then(() => {
    console.log("Server Successfully Connected To Database");
}).catch((err) => {
    console.log(err);
});

app.use(express.json());  //  isme jo data interchange hoga wo "JSON" ma hoga
app.use(express.urlencoded({extended : true}));  //  Agr koi url hoga tu wo encoded hoga
app.use(cookieParser());

app.post("/signup", async (req, res) => {  //api
    const {email, password} = req.body;
    const newUser = await User.create({email, password});
    const jwtToken = jwtHelper.generateJWTToken({
        user_id : newUser._id
    });
    res.cookie("token", jwtToken).status(201).json({   // -->> (key , value) ; ye cookie client ke POSTman ya browser ma jakr store hogae gi
        status : "ok",
        data : "You are successfully signed up",
    });  
    console.log(newUser);
})

// Example Route for JSON Token ; we have to check a user get access if it sign up successfully through email, password
app.get("/main", async (req, res) => { 
        const token = req.cookies.token;  // cookie-parser is use to extract the cookie request 
        console.log(token);
        const userID = jwtHelper.decodeJWTToken(token); // is token ma se hamarae user ki id bahr nikal lega aur wo user mere database ma ha isko authorize karega;
        const user = await User.find({_id : userID.user_id})
        if(user){
            res.status(201).json({
                status : "This is the main page",
            })
        }else{
            res.status(404).json({
                status : "Authorization Failed, Please Sign Up",
            })
        }
})

app.listen(5000, () => {
    console.log("Server has been started");
});

// When we run on a local server ; our url - http://localhost:5000/signup 