const express = require("express")
const { createMusic } = require("../controllers/music.controller")

const multer = require('multer')

const upload = multer({
    storage : multer.memoryStorage()
})



const musicRouter = express.Router()

musicRouter.post("/upload",upload.single("music"),createMusic)

module.exports = musicRouter