module.exports = (packet) => {
    const h = packet.substr(1, packet.length - 2)
    const obj = h.split("%")
    const arr = []
    const lenObj = obj.length 
    for(let i = 3; i < lenObj; i++){
        arr.push(obj[i])
    }
    return {command: obj[2], payload: arr}
}