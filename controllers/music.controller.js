const musicModel = require("../model/music.model")
const jwt = require("jsonwebtoken")
const uploadFile = require("../services/storage.service")
const albumModel = require("../model/album.model")

const createMusic = async(req,res)=>{

    try {

        const {title} = req.body
        const file = req.file

        const decoded = req.user

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

const createAlbum = async(req,res)=>{
    try {
        

        const {title,musicIds} = req.body
        const decoded = req.user
        const album = albumModel.create({
            title,
            artist : decoded.id,
            music : musicIds
        })

        res.status(201).json({
            message : "album created successfully",
            album
        })
        

    } catch (error) {
        console.log(error.message)
        res.status(400).json({message : error.message})
    }
}

const getAllMusics = async(req,res)=>{
    try {

        const music = await musicModel.find().limit(10)
        return res.status(200).json({
            message : "all musics fetched successfully",
            music
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message : error.message})
    }
}

const getAllAlbums = async(req,res)=>{
   try {
     const albums = await albumModel.find().select("title artist")

     res.status(200).json({
        message:"all albums fetched successfully",
        albums
     })
   } catch (error) {
    console.log(error.message)
        res.status(400).json({message : error.message})
   }
}

const getAllAlbumById = async(req,res)=>{

    try {
        const id = req.params.id
        const album = await albumModel.findById(id)
        res.status(200).json({
            message : "album fetched successfully",
            album
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message : error.message})
    }
}

module.exports = {createMusic,createAlbum,getAllMusics,getAllAlbums,getAllAlbumById}