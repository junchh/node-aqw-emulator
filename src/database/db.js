const mongoose = require('mongoose')
const config = require('config')

const URI = config.get("mongoURI")

const connectDB = async () => {

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        console.log('MongoDB Connected.')
    } catch (err){
        process.exit(1)
    }
}

module.exports = connectDB