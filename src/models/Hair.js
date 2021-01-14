const mongoose = require('mongoose')

const HairSchema = mongoose.Schema({
    _id: Number,
    name: String,
    fileName: String
})

module.exports = mongoose.model('hair', HairSchema)