const googleStrategy = require("passport-google-oauth20").Strategy
const passport=require("passport")


passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    callbackURL: "/user/google/callback",
    scope:["profile", "email"]
   },
    function(accessToken, refreshToken,profile,callback){
        callback(null,profile)
    }
))

passport.serializeUser((user,next)=>{
    next(null,user)
})
passport.deserializeUser((user,next)=>{
    next(null,user)
})