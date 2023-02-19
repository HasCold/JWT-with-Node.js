// JasonWebToken(JWT) ak token hota ha jis ma hamari koi information hoti ha

const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();  // By this code, we can access easily to .env file

// Payload -->> The data which we have to convert in a token or want to secure that data is known as Payload ; like below we have a user is a payload

// Function for the token Creation
const generateJWTToken = (data) => {
    // Secret key -->> The key from which you can access the data from Token or Decode data from the Token
    const secretKey = process.env.SECRET_KEY;  // Access the secret key from .env file
    
    // Options
    const options = {
        algorithm : "HS256",  // Jab ham ksi bhi tarah ke data ko JSON ya Payload ko encrypt ya hash krna chahte ha token ma us encryption k liye algorithm ka use kiya jata ha ham HS256 ka use karenge 
    };
    return JWT.sign(data, secretKey, options);  // we have to create a token by sign method
};

// Function for Decode the token 
const decodeJWTToken = (token) => {
    const secretKey = process.env.SECRET_KEY;  // Access the secret key from .env file
    
return JWT.verify(token, secretKey);
};

module.exports = {
    generateJWTToken,
    decodeJWTToken
} 
