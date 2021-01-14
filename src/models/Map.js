const mongoose = require('mongoose')

const MapSchema = mongoose.Schema({
    _id: Number,
    name: String,
    fileName: String,
    monBranch: Array,
    extra: String
})

module.exports = mongoose.model('map', MapSchema)