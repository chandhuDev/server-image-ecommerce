const mongoose=require("mongoose")
const commentSchema = require('./commentSchema');
const postSchema=new mongoose.Schema({
    description:String,
    categoryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment:[commentSchema],
    like:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    imageUrl:String,
})


module.exports=mongoose.model("Post",postSchema)