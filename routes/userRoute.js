const express=require("express")
const User=require("../schema/userSchema")
const router=express.Router()
const passport=require("passport")

const {failure,getUserInfo,logout,getUsers}=require("../controllers/userController")

router.get("/google",passport.authenticate("google",["profile","email"]))
router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login/failure"}),(req,res) => {
    const userData = {
        username: req.user._json.name,
        email: req.user._json.email,
        profileImage: req.user._json.picture,
      };

     User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error checking if user exists')
        } else if (!user) {
          // Save user data to MongoDB
          const newUser = new User(userData);
          newUser.save()
          .then((user) => {
            console.log('User saved to database',user._id);
            res.cookie('userId', user._id);
            res.redirect(process.env.CLIENT_URL);
          })
          .catch(err => console.error(err));
        } else {
          console.log('User',user._id);
          res.cookie('userId', user._id);
          res.redirect(process.env.CLIENT_URL);
        }
      });
      
})

router.route("/login/failure").get(failure)
router.route("/getUserInfo/:id").get(getUserInfo)
router.route("/logout").get(logout)
router.route("/getUsers").get(getUsers)



module.exports=router