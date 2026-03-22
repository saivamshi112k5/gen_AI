require("dotenv").config();
const app  = require("./src/app")
const connectToDB = require("./config/database");
connectToDB();
app.listen(3000,()=>{
    console.log("server is up and running");
})