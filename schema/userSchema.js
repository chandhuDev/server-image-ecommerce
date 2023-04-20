const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
username:String,
email:String,
profileImage:String,
})
module.exports=mongoose.model("User",userSchema)