const musicModel = require("../model/music.model")
const jwt = require("jsonwebtoken")
const uploadFile = require("../services/storage.service")

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

        const result = await uploadFile(file.buffer.toString("base64"))

        const music = await musicModel.create({
            url : result.url,
            title,
            artist : decoded.id
        })

        res.status(201).json({
            message:"music created successfully",
            music : {
                id : music._id,
                title : music.title,
                url : music.url,
                artist : music.artist
            }
        })

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({message : error.message})
    }
}

module.exports = {createMusic}