const express=require("express")
const cors=require("cors")
const passport=require("passport")
const expressSession=require("express-session")
const passportSetUp=require("./passport")
const bodyParser = require('body-parser');
const fileUpload=require("express-fileupload")
const cloudinary = require('cloudinary').v2;
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSession({
    secret: 'chandhu@123',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:60000}
}))
app.use(cors({
    origin:'*',
    credentials:true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
}));

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})


const userRoute=require("./routes/userRoute")
const postRoute=require("./routes/postRoute")
app.use((req,res,next)=>{
    console.log("request params",req.path)
    next()
})
app.use("/user",userRoute)
app.use("/post",postRoute)


module.exports=app


