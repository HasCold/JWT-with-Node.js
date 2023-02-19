const mongoose = require("mongoose");

// Schema :- Means how the data shows in our database
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
})

const User = mongoose.model("User", userSchema);

module.exports= User;