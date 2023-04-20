const User=require("../schema/userSchema")

exports.failure=async (req,res,next)=>{
res.status(401).json({
    error:true,
    message:"Log in failure"
})
}

exports.getUserInfo=async (req,res,next)=>{
    const id = req.body.id
    console.log("id",id)
   // console.log("request path",req.path)
    User.findById(req.body.id)
    .then(user => {
         if (!user) {
            return res.status(404).send('Item not found');
         }
      console.log("in getting the userInfo,",user);
      res.json(user);
      // Do something with the user data
    })
    .catch(err => {
        console.error(err)
        res.status(500).send('Server Error')
    })
}

exports.logout=async (req,res,next)=>{
    req.logout()
    res.redirect(process.env.CLIENT_URL)
}