const Post=require("../schema/postSchema")
const Category=require("../schema/categorySchema")
const User=require("../schema/userSchema")
const cloudinary=require("cloudinary").v2


exports.createPost =async (req,res,next)=>{
  const { description,category,userId } = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const resultImage=await cloudinary.uploader.upload(
    req.files.postImage.tempFilePath,
    {
        folder:"/imageEcommerce/postImages"
    }
   )
    Category.findOne({category:category})
    .then((category) => {
        Post.create({
            description:description ,
            userId : userId,
            categoryId:category._id,
            imageUrl:resultImage.secure_url
          }).then((post) => {
            console.log('Post created successfully',post);
            res.status(200).send(post);
          }).catch((error) => {
            console.error("error in creating the post",error);
          });
    })
    .catch((error) => {
        console.error("error in finding the category",error);
    })
}



exports.updatePost = async (req,res,next)=>{
  const {comment,postId,like,userId}=req.body
  try {
    const post = await Post.findById(postId).populate('likes').populate({ path:'comment.user', model:'User' });
    const user = await User.findById(userId)
    if(like){
        // if (post.like.some(like => like._id.equals(userId))) {
        //   res.status(400).send('User already liked the post.');
        // } else {
          post.like.push(userId);
          await post.save();
          console.log("update post",post)
        // }
    }
    else if(comment && like){
        const comment = new Comment({ text: comment, user: userId });
        post.comment.push(comment);
        post.like.push(userId)
        // Save updated post object
        await post.save();
        console.log("updated post",post)
    }
   res.status(200).send(post)
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



exports.getPost = async (req,res,next)=>{
    const {userId}=req.body
    if(userId){
        Post.find({userId:userId})
        .populate('categoryId')
        .populate('userId')
        .populate('comment')
        .populate('like')
        .exec((error, posts) => {
            if (error) {
                console.error(error);
            } else {
                console.log(posts);
                res.status(200).send(posts);
            }
        });
    }
    else{
        Post.find()
         .populate('categoryId')
         .populate('userId')
         .populate('comment')
         .populate('like')
         .exec((error, posts) => {
        if (error) {
            console.error(error);
        } else {
            console.log(posts);
        }
        });
      }
}
