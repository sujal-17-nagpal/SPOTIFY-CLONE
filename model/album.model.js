const mongoose = require("mongoose")

const albumSchema = new mongoose.Schema({
    artist :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    title : {
        type : String,
        required : true
    },
    musics :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "musics"
    }]
})

const albumModel = mongoose.model("album",albumSchema)

module.exports = albumModel