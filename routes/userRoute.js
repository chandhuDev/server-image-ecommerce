const express=require("express")
const User=require("../schema/userSchema")
const router=express.Router()
const passport=require("passport")

const {failure,getUserInfo,getUsers}=require("../controllers/userController")

router.get("/google",passport.authenticate("google",["profile","email"]))
router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login/failure"}),async(req,res) => {
    const userData = {
        username: req.user._json.name,
        email: req.user._json.email,
        profileImage: req.user._json.picture,
      };
      const user = await User.findOne({ email: userData.email }).exec()
      try{
        if(user){
          console.log('User 1',user._id);
          res.cookie('userId', user._id)
          res.redirect(process.env.CLIENT_URL);
          
        }
        else{
          // Save user data to MongoDB
          const newUser = new User(userData);
          newUser.save()
          .then((user) => {
            console.log('new user',user._id);
            res.cookie('userId', user._id)
            res.redirect(process.env.CLIENT_URL);
          })
          .catch(err => console.error(err));
        }
      }
      catch(err){
        console.error(err.message);
        res.status(500).send('Error checking if user exists')
      }
})

router.route("/login/failure").get(failure)
router.route("/getUserInfo/:id").get(getUserInfo)
router.route("/getUsers").get(getUsers)



module.exports=router
