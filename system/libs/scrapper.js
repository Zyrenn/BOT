const axios = require("axios") 
const Spotify = require("spotifydl-core") 
const { youtubedl } = require("@bochilteam/scraper") 
const { downloader } = require("decode.id")
const { fetchBuffer } = require("@libs/function.js")


const spotifyDL = async (link) => {
    const result = { status: false, buffer: "", message: "" }
    const spotify = new Spotify({ clientId: "7579589d9a0a42a9bcc7de03798f2884", clientSecret: "cdae1edb68f84bfb8b9b2390062a5e70" })
    return await spotify.downloadTrack(link).then((buffer) => {
        result.status = true
        result.buffer = buffer
        return result
    }).catch(() => {
        result.message = "Server sedang error"
        return result
    })
}


const instagramDL = async (link) => {
    const results = { status: false, data: [], message: "" }
    return await downloader.instagram(link).then(async ({ status, data, message }) => {
         if (status) {
             for (const x of data) {
                 const { status, buffer } = await fetchBuffer(x.url) 
                 if (status) results.data.push({ type: x.type, url: x.url, thumbnail: x.thumbnail, buffer, base64: buffer.toString("base64") }) 
             }
             results.status = true
         } else {
             results.message = message
         }
         return results
    }) 
}

const youtubeDL = async (url, type, quality = "") => {
    const result = { status: false, data: "", message: "" }
    return await youtubedl(url).then(async (response) => {
        if (type == "mp4" && quality == "144p" && Object.keys(response.video).includes("144p") || type == "mp4" && Object.keys(response.video).includes("144p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["144p"].fileSizeH,
                quality: response.video["144p"].quality, 
                link: await response.video["144p"].download()
            }
        } else if (type == "mp4" && quality == "240p" && Object.keys(response.video).includes("240p") || type == "mp4" && Object.keys(response.video).includes("240p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["240p"].fileSizeH,
                quality: response.video["240p"].quality, 
                link: await response.video["240p"].download()
            }
        } else if (type == "mp4" && quality == "360p" && Object.keys(response.video).includes("360p") || type == "mp4" && Object.keys(response.video).includes("360p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["360p"].fileSizeH,
                quality: response.video["360p"].quality, 
                link: await response.video["360p"].download()
            }
        } else if (type == "mp4" && quality == "480p" && Object.keys(response.video).includes("480p") || type == "mp4" && Object.keys(response.video).includes("480p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["480p"].fileSizeH,
                quality: response.video["480p"].quality, 
                link: await response.video["480p"].download()
            }
        } else if (type == "mp4" && quality == "720p" && Object.keys(response.video).includes("720p") || type == "mp4" && Object.keys(response.video).includes("720p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["720p"].fileSizeH,
                quality: response.video["720p"].quality, 
                link: await response.video["720p"].download()
            }
        } else if (type == "mp4" && quality == "1080p" && Object.keys(response.video).includes("1080p") || type == "mp4" && Object.keys(response.video).includes("1080p") && quality == "") {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["1080p"].fileSizeH,
                quality: response.video["1080p"].quality, 
                link: await response.video["1080p"].download()
            }
        } else if (type == "mp4" && quality == "auto" && Object.keys(response.video).includes("auto") || type == "mp4" && Object.keys(response.video).includes("auto")) {
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.video["auto"].fileSizeH,
                quality: response.video["auto"].quality, 
                link: await response.video["auto"].download()
            }
        } else if (type == "mp3") {
            const localQuality = Object.keys(response.audio)[0]
            result.status = true
            result.data = {
                title: response.title, 
                thumbnail: response.thumbnail, 
                size: response.audio[localQuality].fileSizeH,
                quality: response.audio[localQuality].quality, 
                link: await response.audio[localQuality].download()
            }
        }
        return result
    }).catch(() => {
        result.message = "Server sedang maitance..."
        return result
    }) 
}


const tiktokDL = async (link) => {
    const results = { status: false, data: [], message: "" }    
    return await downloader.tiktok(link, { version: "v1" }).then(async (v1) => {
         if (v1.status) {
             for (const x of v1.data) {
                 if (x.isWatermark == false && (x.type == "video" && results.data.filter((x) => x.type == "video").length == 0 || x.type == "audio" && results.data.filter((x) => x.type == "audio").length == 0 || x.type == "image")) {
                     const { status, buffer } = await fetchBuffer(x.url) 
                     if (status) results.data.push({ type: x.type, url: x.url, buffer, base64: buffer.toString("base64") }) 
                 }
             }
             results.status = true
             return results
         } else {
             return await downloader.tiktok(link, { version: "v2" }).then(async (v2) => {
                 if (v2.status) {
                     for (const x of v2.data) {
                         if (x.type == "video" && results.data.filter((x) => x.type == "video").length == 0 || x.type == "audio" && results.data.filter((x) => x.type == "audio").length == 0 || x.type == "image") {
                             const { status, buffer } = await fetchBuffer(x.url) 
                             if (status) results.data.push({ type: x.type, url: x.url, buffer, base64: buffer.toString("base64") }) 
                         }
                     }
                     results.status = true
                 } else {
                     results.message = v2.message
                 }
                 return results
             }) 
         }
    }) 
}


const ChatGPTRequest = async (text) => {
    const result = { status: false, data: "", message: "" }
    return await axios({ 
        "method": "POST", 
        "url": "https://api.openai.com/v1/completions", 
        "data": { 
            "model": "text-davinci-003", 
            "prompt": text, 
            "max_tokens": 1000, 
            "temperature": 0 
        },
        "headers": { 
            "accept": "application/json", 
            "Content-Type": "application/json", 
            "Accept-Language": "in-ID",
            "Authorization": "Bearer " + db.settings.local_key.open_ai
        }
    }).then((response) => {
        if (response.status == 200) {
            const { choices } = response.data
            if (choices && choices.length) {
                result.status = true
                result.data = choices[0].text
            }
        } else {
            result.message = "Server sedang maitance..."
        }
        return result
    }).catch((error) => {
        if (error.message.includes("401")) {
            result.message = "key kosong ka minta sama owner buat isi"
        } else if (error.message.includes("429")) {
            result.message = "Not access key"
        } else {
            result.message = "Error : " + error.message
        }
        return result
    })
}



module.exports = { ChatGPTRequest, tiktokDL, spotifyDL, instagramDL, youtubeDL }