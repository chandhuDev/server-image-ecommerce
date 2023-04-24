const User=require("../schema/userSchema")

exports.failure=async (req,res,next)=>{
res.status(401).json({
    error:true,
    message:"Log in failure"
})
}

exports.getUserInfo=async (req,res,next)=>{
    const id = req.params.id
    console.log("id",id)
   // console.log("request path",req.path)
    User.findById(req.params.id)
    .then(user => {
         if (!user) {
            return res.status(404).send('Item not found');
         }
      console.log("in getting the userInfo,",user);
      res.status(200).send(user)
      // Do something with the user data
    })
    .catch(err => {
        console.error(err)
        res.status(500).send('Server Error')
    })
}


exports.getUsers=async (req,res)=>{
    User.find()
    .then(user=>
        res.status(200).send(user)
    )
    .catch(e=>{
        console.log(error)
    })
}

exports.logout=async (req,res,next)=>{
    req.logout()
    res.redirect(process.env.CLIENT_URL)
}