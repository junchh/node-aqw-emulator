const parser = require('fast-xml-parser')

const options = {
    attributeNamePrefix : "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : true,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    stopNodes: ["parse-me-as-string"]
}

module.exports = (xml) => {
    const obj = parser.parse(xml, options)

    const username = obj.msg.body.login.nick.__cdata.split("~")[1]
    const password = obj.msg.body.login.pword.__cdata

    return {username, password}
}