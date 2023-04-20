const mongoose=require("mongoose")
const commentSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String }
})
module.exports=commentSchema