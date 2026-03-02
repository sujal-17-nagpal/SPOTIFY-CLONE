require("dotenv").config()
const connectDb = require("./db/db")
const app = require("./src/app")


connectDb()

app.listen(3000,()=>{
    console.log("server running on port 3000")
})