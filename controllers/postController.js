const Post=require("../schema/postSchema")
const Category=require("../schema/categorySchema")
const User=require("../schema/userSchema")
const Comment=require("../schema/commentSchema")
const cloudinary=require("cloudinary").v2


exports.createPost =async (req,res,next)=>{
  
  console.log(req.body)
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  const resultImage=await cloudinary.uploader.upload(
    req.files.postImage.tempFilePath,
    {
        folder:`/imageEcommerce/postImages/${req.body.category}`
    }
   )
   try {
    const category = await Category.findOne({ category: req.body.category });
    const post = await Post.create({
      description: req.body.description,
      userId: req.body.userId,
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
  console.log(req.body)
  let updatedPost;
  try {
    const user = await User.findById(req.body.userId)
    
    const like=req.body.like&&req.body.like
    if(req.body.comment && like){
        const newComment =await Comment.create({ text: req.body.comment, image: user.profileImage , name : user.username });
        console.log(newComment)
            updatedPost = await Post.findOneAndUpdate(
             { _id: req.body.postId },
             { 
               $addToSet: { like: req.body.userId },
               $push: { comment: newComment }
             },
             { new: true }
             ).populate('comment').populate('userId')
             console.log("in comment and like",updatedPost)
    }
    else if(req.body.like){
        updatedPost = await Post.findOneAndUpdate(
            { _id: req.body.postId },
            { $push: { like: req.body.userId } },
            { new: true }
          ).populate('comment').populate('userId')
          console.log("in  like",updatedPost)
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
        res.status(200).json(posts);
    })
    .catch(error=>console.log(error))
}