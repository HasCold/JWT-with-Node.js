// package.json file -->> for your external dependencies  ; npm init --y

// JasonWebToken(JWT) ak token hota ha jis ma hamari koi information hoti ha

const JWT = require("jsonwebtoken");

// Payload -->> The data which we have to convert in a token or want to secure that data is known as Payload ; like below we have a user is a payload

const user = {
    //  We have to secure this information by converting it into a Token
    name : "Hasan",
    email : "ha03@gmail.com",
};
// Secret key -->> The key from which you can access the data from Token or Decode data from the Token
const secretKey = "mySecretKey";

// Options
const options = {
    algorithm : "HS256",  // Jab ham ksi bhi tarah ke data ko JSON ya Payload ko encrypt ya hash krna chahte ha token ma us encryption k liye algorithm ka use kiya jata ha ham HS256 ka use karenge 
};

// const token = JWT.sign(user, secretKey, options);  // we have to create a token by sign method
// console.log(token);

// From below you can decode the data from Token :-
const generateToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGFzYW4iLCJlbWFpbCI6ImhhMDNAZ21haWwuY29tIiwiaWF0IjoxNjc2NzM2NDQzfQ.0GL2meCNmvLJU-BVT9zi1cmc9mxqanDH9bGy7cVwv-0";

const data = JWT.verify(generateToken, secretKey);
console.log(data); // -->> { name: 'Hasan', email: 'ha03@gmail.com', iat: 1676736443 } ; iat means issued at ; it denotes token timestamp creation 

