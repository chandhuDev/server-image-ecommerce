const express=require("express")
const User=require("../schema/userSchema")
const jwt=require("jsonwebtoken")
const router=express.Router()

const {createPost,updatePost,deletePost,getPost}=require("../controllers/postController")



router.route("/create").post(createPost)
router.route("/update").put(updatePost)
router.route("/delete").delete(deletePost)
router.route("/viewInfo").get(getPost)


module.exports=router