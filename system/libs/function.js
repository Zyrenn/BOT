const fs = require("fs") 
const util = require("util") 
//const tfjs = require("@tensorflow/tfjs-node") //"@tensorflow/tfjs-node": "^3.12.0"
const jimp = require("jimp") 
const path = require("path") 
//const nsfw = require("nsfwjs") //"nsfwjs": "^2.4.1"
const axios = require("axios") 
const readline = require("readline")
const moment = require("moment-timezone") 
const parseMs = require("parse-ms") 
const { exec } = require("child_process")
const { jidDecode } = require("@adiwajshing/baileys")
const { commands } = require("@libs/collection")


const sleep = (ms) => {
    return new Promise((x) => setTimeout(x, ms))
}

const randomNomor = (angka, type = "") => {
    return (Math.floor(Math.random() * angka) + 1) + type
}

const pickRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)]
}

const isUrl = (url) => {
    try{
        return (url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "gi"))).length? true : false
    } catch {
        return false
    }
}

const toFirstCase = (teks) => {
    return teks.split(" ").map((nama) => nama.charAt(0).toUpperCase() + nama.slice(1)).join(" ")
}

const randomCode = () => {
    const code1 = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"]
    const code2 = ["M","N","B","V","C","X","Z","L","K","J","H","G","F","D","S","A","P","O","I","U","Y","T","R","E","W","Q"]
    const code3 = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    const code4 = ["m","n","b","v","c","x","z","l","k","j","h","g","f","d","s","a","p","o","i","u","y","t","r","e","w","q"]
    const code5 = ["1","2","3","4","5","6","7","8","9","0"]
    const code6 = ["0","9","8","7","6","5","4","3","2","1"]
    return pickRandom(code1) + pickRandom(code2) + pickRandom(code3) + pickRandom(code4) + pickRandom(code5) + pickRandom(code6) + pickRandom(code5) + pickRandom(code4) + pickRandom(code3) + pickRandom(code2) + pickRandom(code1) + pickRandom(code1) + pickRandom(code2) + pickRandom(code3) + pickRandom(code4) + pickRandom(code5) + pickRandom(code6) + pickRandom(code5) + pickRandom(code4) + pickRandom(code3) + pickRandom(code2) + pickRandom(code1)
}

const decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
    let decode = jidDecode(jid) || {}
    return decode.user && decode.server && decode.user + "@" + decode.server || jid
    } else return jid
}

const isFiles = (PATH) => {
    if (fs.existsSync(PATH)) {
        try{
            return Buffer.isBuffer(fs.readFileSync(PATH)) 
        } catch {
            return false
        }
    } else return undefined
}

const isBase64 = (string) => {
    const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    return regex.test(string)
}

const resizeImage = async (content, width, height) => {
    const result = { status: false, buffer: null, base64: null, message: "" }
    if (Buffer.isBuffer(content)) {
        var buffer = content
    } else if (isBase64(content)) {
        var buffer = Buffer.from(content, "base64")
    } else if (isFiles(content)) {
        var buffer = fs.readFileSync(content)
    } else {
        result.message = "Terjadi kesalahan"
        return result
    }
    try{
        const readBuffer = await jimp.read(buffer);
        const response = await readBuffer.resize(Number(width), Number(height)).getBufferAsync(jimp.MIME_JPEG)
        result.status = true
        result.buffer = response
        result.base64 = response.toString("base64")
        return result
    } catch {
        result.message = "Terjadi kesalahan"
        return result
    }
}

const calender = () => {
    return moment().locale("id").tz("Asia/Jakarta").format("dddd, DD MMMM YYYY")
}
    
const week = () => {
    return moment().locale("id").tz("Asia/Jakarta").format("dddd")
}

const time = (val) => {
    if (val == undefined) val = 0
    const n = parseFloat(val)
    const type = (val.toLowerCase().includes("year") || val.toLowerCase().includes("tahun"))? "years" : (val.toLowerCase().includes("month") || val.toLowerCase().includes("bulan"))? "months" : (val.toLowerCase().includes("week") || val.toLowerCase().includes("minggu"))? "weeks" : (val.toLowerCase().includes("day") || val.toLowerCase().includes("hari"))? "days" : (val.toLowerCase().includes("hour") || val.toLowerCase().includes("jam"))? "hours" : (val.toLowerCase().includes("minute") || val.toLowerCase().includes("menit"))? "minutes" : (val.toLowerCase().includes("second") || val.toLowerCase().includes("detik"))? "seconds" : ""
        switch (type) {
        case "years":
            return n * 31104000000
        break
        case "months":
            return n * 2592000000
        break
        case "weeks":
            return n * 604800000
        break
        case "days":
            return n * 86400000
        break
        case "hours":
            return n * 3600000
        break
        case "minutes":
            return n * 60000
        break
        case "seconds":
            return n * 1000
        break
        default:
        return undefined;
    }
}

const fetchJson = async (link) => {
    const result = { status: false, data: "", message: "" }
    return await axios.get(link).then((response) => {
         if (response.status == 200) {
             result.status = true
             result.data = response.data
         } else {
             result.message = "Server Maitance..."
         }
         return result
    }).catch(() => {
        result.message = "Server Maitance..."
        return result
    })
}
    
const fetchBuffer = async (string) => {
    const result = { status: false, buffer: null, message: "" }
    if (isUrl(string)) {
        return await axios({
            "method": "GET", 
            "url": string, 
            "headers": { 
                "DNT": 1,
                "Upgrade-Insecure-Request": 1
            },
            "responseType": "arraybuffer"
        }).then((response) => {
             if (response.status == 200) {
                result.status = true
                result.buffer = response.data
             } else {
                result.message = "Server Maitance..."
             }
             return result
        }).catch(() => {
             result.message = "Server Maitance..."
             return result
        })
    } else if (Buffer.isBuffer(string)) {
        result.status = true
        result.buffer = string
        return result
    } else if (isBase64(string)) {
        result.status = true
        result.buffer = Buffer.from(string, "base64")
        return result
    } else if (isFiles(string)) {
        result.status = true
        result.buffer = fs.readFileSync(string)
        return result
    } else {
        result.message = "Buffer not accept"
        return result
    }
}

const fetchBase64 = (string) => {
    const result = { status: false, base64: null, message: "" }
    if (Buffer.isBuffer(string)) {
        const buffer = new Buffer(buffer)
        result.status = true
        result.base64 = buffer.toString("base64")
        return result
    } else if (isBase64(string)) {
        result.status = true
        result.base64 = string
        return result
    } else if (isFiles(string)) {
        result.status = true
        result.base64 = fs.readFileSync(string).toString("base64")
        return result
    } else {
        result.message = "Base64 not accept"
        return result
    }
}

const formatSize = (bytes) => {
    if (bytes >= 1000000000) {
        bytes = (bytes / 1000000000).toFixed(2) + " GB"
    } else if (bytes >= 1000000) {
        bytes = (bytes / 1000000).toFixed(2) + " MB"
    } else if (bytes >= 1000) {
        bytes = (bytes / 1000).toFixed(2) + " KB"
    } else if (bytes > 0) {
        bytes = bytes + " bytes"
    } else {
        bytes = "0 bytes"
    }
}

const runtime = (time) => {
    if (isNaN(time)) return time
    time = Number(time)
    const years = Math.floor(time / (3600 * 8640))
    const months = Math.floor((time % (3600 * 8640)) / 2592000)
    const weeks = Math.floor((time % (3600 * 720)) / 604800)
    const days = Math.floor((time % (3600 * 168)) / 86400)
    const hours = Math.floor((time % (3600 * 24)) / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    const isYears = years > 0? `${years} years, ` : ""
    const isMonths = months > 0? `${months} months, ` : ""
    const isWeeks = weeks > 0? `${weeks} weeks, ` : ""
    const isDays = days > 0? `${days} days, ` : ""
    const isHours = hours > 0? `${hours} hours, ` : ""
    const isMinutes = minutes > 0? `${minutes} minutes, ` : ""
    const isSeconds = seconds > 0? `${seconds} seconds` : ""
    return isYears + isMonths + isWeeks + isDays + isHours + isMinutes + isSeconds
}

const timeToEpired = (time) => {
    if (isNaN(time)) return time
    time = Number(time) - Date.now()
    const years = Math.floor(Number(parseMs(time).days) / 360)
    const months = Math.floor((Number(parseMs(time).days) % 360) / 30)
    const weeks = Math.floor((Number(parseMs(time).days) % 30) / 7)
    const days = Math.floor((Number(parseMs(time).days) % 7) / 1)
    const hours = Number(parseMs(time).hours)
    const minutes = Number(parseMs(time).minutes)
    const seconds = Number(parseMs(time).seconds)
    const isYears = years > 0? `${years} years, ` : ""
    const isMonths = months > 0? `${months} months, ` : ""
    const isWeeks = weeks > 0? `${weeks} weeks, ` : ""
    const isDays = days > 0? `${days} days, ` : ""
    const isHours = hours > 0? `${hours} hours, ` : ""
    const isMinutes = minutes > 0? `${minutes} minutes, ` : ""
    const isSeconds = seconds > 0? `${seconds} seconds` : ""
    return isYears + isMonths + isWeeks + isDays + isHours + isMinutes + isSeconds
}

const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise((resolve) => {
        rl.question(text, resolve)
    })
}

const getMessage = async (store, key) => {
    if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg?.message
    } else {
        return { conversation: "Hai Im juna Bot" }
    }
}

const generateProfilePicture = async (buffer) => {
    const results = { status: false, data: {}, message: "" }
    try {
        const Jimp = await jimp.read(buffer)
        const min = Jimp.getWidth()
        const max = Jimp.getHeight()
        const cropped = Jimp.crop(0, 0, min, max)
        results.data["img"] = await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG)
        results.data["preview"] = await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG)
        results.status = true
        return results
    } catch (error) {
        results.message = util.format(error) 
        return results
    }
}
/*
const checkNSFW = async (content, type = "image") => {
    const results = { status: false, data: 0, message: "" }
    try{
        const { status, buffer, message } = await fetchBuffer(content)
        if (!status) {
            results.message = message
            return results
        }
        if (type == "image") {
            const model = await nsfw.load()
            const image = await tfjs.node.decodeImage(buffer, 3)
            const predictions = await model.classify(image)
            image.dispose()
            results.data += parseInt(predictions.filter((x) => (x.className == "Hentai" || x.className == "Porn" || x.className == "Sexy")).reduce((acumulator, item) => acumulator + item.probability * 100, 0))
            results.status = true
            return results
        } else if (type == "sticker") {
            const tmpFileIn = path.join("./temp", (fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1) + ".webp")
            const tmpFileOut = path.join("./temp", (fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1) + ".jpg")
            await fs.writeFileSync(tmpFileIn, buffer)
            await exec(`ffmpeg -i ${tmpFileIn} ${tmpFileOut}`) 
            const model = await nsfw.load()
            const image = await tfjs.node.decodeImage(fs.readFileSync(tmpFileOut), 3)
            const predictions = await model.classify(image)
            image.dispose()
            results.data += parseInt(predictions.filter((x) => (x.className == "Hentai" || x.className == "Porn" || x.className == "Sexy")).reduce((acumulator, item) => acumulator + item.probability * 100, 0)) 
            results.status = true
            return results
        } else {
           results.message = "type not found!!"
           return results
        }
    } catch (error) {
        results.message = util.format(error) 
        return results
    }
}*/

const checkCommand = (cmd, check) => {
    try{
        if (check == "isCreator") {
            return fs.readFileSync("./system/message/msg.js").toString().split("case \"" + cmd + "\"")[1].split("break")[0].includes("!m.isCreator")
        } else if (check == "isOwner") {
            return fs.readFileSync("./system/message/msg.js").toString().split("case \"" + cmd + "\"")[1].split("break")[0].includes("!m.isOwner")
        } else if (check == "isGroup") {
            return fs.readFileSync("./system/message/msg.js").toString().split("case \"" + cmd + "\"")[1].split("break")[0].includes("!m.isGroup")
        } else if (check == "isPremium") {
            return fs.readFileSync("./system/message/msg.js").toString().split("case \"" + cmd + "\"")[1].split("break")[0].includes("!m.isPremium") 
        } else {
            fs.readFileSync("./system/message/msg.js").toString().split("case \"" + cmd + "\"")[1].split("break")[0]
            return true
        }
    } catch {
        return null
    }
}

module.exports = {
    sleep, 
    randomNomor, 
    pickRandom, 
    isUrl, 
    toFirstCase, 
    randomCode, 
    decodeJid, 
    isFiles, 
    isBase64, 
    resizeImage, 
    fetchBuffer, 
    calender, 
    week, 
    time, 
    fetchJson, 
    fetchBase64, 
    formatSize, 
    runtime, 
    timeToEpired, 
    question, 
    getMessage, 
    generateProfilePicture, 
    checkCommand, 
}
