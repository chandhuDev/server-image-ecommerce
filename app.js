require("dotenv").config()
const app=require("./main")
require("./database/connect").connect()

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server listening succesfully AT ${process.env.PORT}`)
})