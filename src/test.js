const connectDB = require('./database/db')
const Map = require('./models/Map')

connectDB()

const a = new Map({_id: 1, name: 'battleon', fileName: 'battleon/town-Battleon-1Aug20.swf', monBranch: [], extra: ""})

a.save()