const mongoose=require("mongoose")
const Comment = require('./commentSchema');
const postSchema=new mongoose.Schema({
    description:String,
    categoryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment:[{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    like:{type: [String]},
    imageUrl:String,
})


module.exports=mongoose.model("Post",postSchema)