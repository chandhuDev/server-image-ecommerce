const mongoose=require("mongoose")
const commentSchema=new mongoose.Schema({
    image: { type: String},
    text: { type: String },
    name: {type:String}
})
module.exports=mongoose.model('Comment', commentSchema);