const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/* user registeration logic */
async function RegisterNewUser(req,res){
    const {username,password,email} = req.body;
    if(!username || !password || !email){
        return res.status(400).json({
            message:"please fill all the details"
        })
    }
    const userExists = await userModel.findOne({username:username});
    const emailExists = await userModel.findOne({email:email});
    if(userExists || emailExists){
        return res.status(400).json({
            message: "username or password or both are already under use"
        })
    }

/* hashing the password */
  const hash = await bcrypt.hash(password,10);
  const user = new userModel({
    username,
    email,
    password: hash
  });
  await user.save()
/*creating token */
  const token = jwt.sign(
    {id:user._id,username:username},
    process.env.JWT_SECRET,
    {expiresIn: "2d"}
  );
/*cookie created */
  res.cookie("token",token);

  res.status(200).json({
    message:"user registered successfully"
  });
}


async function LoginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "email isn't registered"
    });
  }

  const isMatch =  bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "wrong password"
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "user logged in successfully",
    user: {
      id: user._id,
      username: user.username
    }
  });
}
module.exports = {
  RegisterNewUser,
  LoginController
};