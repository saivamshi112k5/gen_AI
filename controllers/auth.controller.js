const userModel = require("../models/user.model");

async function RegisterNewUser(req,res){
    const {username,password,email} = req.body;
    if(!username || !password || !email){
        res.status(400).json({
            message:"please fill all the details"
        })
    }
    const userExists = await userModel.findOne({username:username});
    const emailExists = await userModel.findOne({email:email});
    if(userExists || emailExists){
        res.status(400).json({
            message: "username or password or both are already under use"
        })
    }
      const newUser = await userModel.create({
    username,
    password,
    email
  });

  return res.status(201).json({
    message: "user registered successfully",
    user: newUser
  });
};

module.exports = {RegisterNewUser};