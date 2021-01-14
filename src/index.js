const net = require('net')
const config = require('config')

const xmlToObject = require('./parser/xmlToObject')
const aqwPacketParser = require('./parser/aqwPacketParser')

const connectDB = require('./database/db')
const User = require('./models/User')

const server = net.createServer()
connectDB()

const SERVER_PORT = config.get("SERVER_PORT")

const users = [{}, {}]

let onlineCount = 0 
let sessId = 2

server.on('connection', (sock) => {

    sock.setEncoding("utf8")

    let user = {}
    let userSessionId = -1

    sock.on('data', async (buffer) => {
        packetLength = buffer.length - 1;
        packet = buffer.substr(0, packetLength) 
        console.log('from user[' + sessId + '] : ' + packet)

        if(packet == '<policy-file-request/>'){
            sock.write(`<cross-domain-policy><allow-access-from domain='*' to-ports='${SERVER_PORT}' /></cross-domain-policy>\0`)
        } else if(packet == "<msg t='sys'><body action='verChk' r='0'><ver v='157' /></body></msg>"){
            sock.write("<msg t='sys'><body action='apiOK' r='0'></body></msg>\0")
        } else if(packet.substr(0, 33) == "<msg t='sys'><body action='login'"){
            const parsedUser = xmlToObject(packet) 

            user = await User.findOne(parsedUser)

            userSessionId = sessId
            users.push({id: sessId, user: user, location: {}, socket: sock})
            onlineCount = onlineCount + 1 
            sessId = sessId + 1 
            
            const resp = `%xt%loginResponse%-1%true%${user._id}%${user.username}%Welcome to AsyncQuest! An educational AQWorlds Private Server made with NodeJS.%2020-08-05T21:42:25%sNews=${config.get("sNews")},sMap=${config.get("sMap")},sBook=${config.get("sBook")},sFBC=${config.get("sFBC")},sAssets=${config.get("sAssets")},sWTSandbox=false,gMenu=${config.get("gMenu")}%\0`
            console.log(resp)
            sock.write(resp)
        } else {
            /* Normal AQW Packet */
            const parsedPacket = aqwPacketParser(packet) 
            let resp = ''
            switch(parsedPacket.command){
                case 'firstJoin':
                    const request = require('./requests/firstJoin')
                    request(sock, user, userSessionId)
                break
                default:
                break
            }
        }
    })

    sock.on('close', () => {
        console.log('disconnected.')
    })
})

server.listen(SERVER_PORT, () => {
    console.log('|----------------------|')
    console.log('|                      |')
    console.log('|                      |')
    console.log('|      AsyncQuest      |')
    console.log('|         v1.0         |')
    console.log('|                      |')
    console.log('|----------------------|')

})