const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true,"username already exists"],
        require: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type:String,
        unique:[true,"email is already in use"],
        require: true
    }

})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;