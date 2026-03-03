const express = require("express")
const { createMusic, createAlbum, getAllMusics, getAllAlbums, getAllAlbumById } = require("../controllers/music.controller")

const multer = require('multer')
const { authArtist, authUser } = require("../middlewares/auth.middleware")

const upload = multer({
    storage : multer.memoryStorage()
})



const musicRouter = express.Router()

musicRouter.post("/upload",authArtist,upload.single("music"),createMusic)
musicRouter.post("/album",authArtist,createAlbum)

musicRouter.get("/",authUser,getAllMusics)
musicRouter.get("/albums",authUser,getAllAlbums)

musicRouter.get("/albums/:id",authUser,getAllAlbumById)

module.exports = musicRouter