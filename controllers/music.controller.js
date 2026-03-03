const musicModel = require("../model/music.model")
const jwt = require("jsonwebtoken")

const createMusic = async(req,res)=>{

    try {
        const token = req.cookies.token

        if(!token){
            return res.status(403).json({message : "unauthorized user"})
        }


        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // if token is not verified it will automatically go to catch error

        const role = decoded.role
        
        if(role !== "artist"){
            return res.status(403).json({message : "You are not authorized to create music"})
        }

        const {title} = req.body
        const file = req.file

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({message : error.message})
    }
}

module.exports = {createMusic}