const Post=require("../schema/postSchema")
const Category=require("../schema/categorySchema")
const User=require("../schema/userSchema")
const Comment=require("../schema/commentSchema")
const cloudinary=require("cloudinary").v2


exports.createPost =async (req,res,next)=>{
  const { description,category,userId } = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const resultImage=await cloudinary.uploader.upload(
    req.files.postImage.tempFilePath,
    {
        folder:`/imageEcommerce/postImages/${category}`
    }
   )
   try {
    const category = await Category.findOne({ category: category });
    const post = await Post.create({
      description: description,
      userId: userId,
      categoryId: category._id,
      imageUrl: resultImage.secure_url
    });
    res.status(200).send(post);
  } catch (error) {
    console.error("Error in creating the post", error);
    res.status(500).send("Server error");
  }
}



exports.updatePost = async (req,res,next)=>{
  const {comment,postId,like,userId}=req.body
  let updatedPost;
  try {
    const user = await User.findById(userId)
    if(comment && like){
        const newComment =await Comment.create({ text: comment, image: user.profileImage });
            updatedPost = await Post.findOneAndUpdate(
             { _id: postId },
             { 
               $addToSet: { like: userId },
               $push: { comment: newComment }
             },
             { new: true }
             ).populate('comment')
    }
    else if(like){
        updatedPost = await Post.findOneAndUpdate(
            { _id: postId },
            { $push: { like: userId } },
            { new: true }
          );
    }
   res.status(200).send(updatedPost)
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error.');
  }
}




exports.deletePost = async (req,res,next)=>{
    const {postId}=req.params
    await Post.findByIdAndDelete(postId)
    res.status(200).send({message:"Post Deleted"})
}


exports.allPosts =async (req,res)=>{
    Post.find()
     .populate('categoryId')
     .populate('userId')
     .populate('comment')
     .then(posts => {
        res.status(200).send(posts);
    })
    .catch(error=>console.log(error))
}