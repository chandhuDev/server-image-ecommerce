const express=require("express")
const router=express.Router()
const {createPost,updatePost,deletePost,allPosts}=require("../controllers/postController")

router.route("/create").post(createPost)
router.route("/update").put(updatePost)
router.route("/delete").delete(deletePost)
router.route("/getAllPosts").get(allPosts)

module.exports=router