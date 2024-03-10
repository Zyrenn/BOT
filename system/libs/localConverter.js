const fs = require("fs") 
const util = require("util") 
const axios = require("axios") 
const ffmpeg = require("fluent-ffmpeg") 
const webpmux = require("node-webpmux") 
const FormData = require("form-data")
const { exec } = require("child_process")
const { basename, join } = require("path")
const { calender, fetchBuffer } = require("@libs/function.js")
/*
const webpToVideo = async (content) => {
    const results = { status: false, buffer: null, base64: null, message: "" }
    try{
        const { status, buffer, message } = await fetchBuffer(content)
        const webp = join("./temp", (fs.readdirSync("./temp").filter((x) => !x.includes("@4.0.4")).length + 1) + ".webp")
        const gif = join("./temp", (fs.readdirSync("./temp").filter((x) => !x.includes("@4.0.4")).length + 1) + ".gif")
        const mp4 = join("./temp", (fs.readdirSync("./temp").filter((x) => !x.includes("@4.0.4")).length + 1) + ".mp4")
        if (!status) {
            results.message = message
            return results
        }
        fs.writeFileSync(webp, buffer)
        exec(`convert ${webp} ${gif}`, (err, stdout) => {
            if (err) {
                results.message = util.format(err) 
                return results
            }
            if (stdout) exec(`ffmpeg -i ${gif} -vf "crop=trunc(iw/2)*2:trunc(ih/2)*2" -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p ${mp4}`, (err, output) => {
                if (err) {
                    results.message = util.format(err) 
                } else if (output) {
                    results.buffer = fs.readFileSync(mp4)
                    results.base64 = fs.readFileSync(mp4).toString("base64")
                    results.status = true
                }
                return results
            })
        })
        return results
    } catch (error) {
        results.message = util.format(error) 
        return results
    }
}
*/

const imageToWebp = async (content) => {
    const results = { status: false, buffer: null, base64: null, message: "" }
    try{
        const { status, buffer, message } = await fetchBuffer(content)
        const tmpFileIn = join("./temp", (fs.readdirSync("./temp").filter((x) => !x.includes("@4.0.4")).length + 1) + ".jpg")
        const tmpFileOut = join("./temp", (fs.readdirSync("./temp").filter((x) => !x.includes("@4.0.4")).length + 1) + ".webp")
        if (!status) {
            results.message = message
            return results
        }
        fs.writeFileSync(tmpFileIn, buffer)
        await new Promise((resolve, reject) => {
            ffmpeg(tmpFileIn)
                .on("error", reject)
                .on("end", () => resolve(true))
                .addOutputOptions([
                    "-vcodec",
                    "libwebp",
                    "-vf",
                    "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
                ])
                .toFormat("webp")
                .save(tmpFileOut)
        })
        results.buffer = fs.readFileSync(tmpFileOut)
        results.base64 = fs.readFileSync(tmpFileOut).toString("base64")
        results.status = true
        return results
    } catch (error) {
        results.message = util.format(error) 
        return results
    }
}
        
        

const videoToWebp = async (content) => {
    const results = { status: false, buffer: null, base64: null, message: "" }
    try{
        const { status, buffer, message } = await fetchBuffer(content)
        const tmpFileIn = join("./temp", (fs.readdirSync("./temp").filter((x) => !x.includes("@4.0.4")).length + 1) + ".mp4")
        const tmpFileOut = join("./temp", (fs.readdirSync("./temp").filter((x) => !x.includes("@4.0.4")).length + 1) + ".webp")
        if (!status) {
            results.message = message
            return results
        }
        fs.writeFileSync(tmpFileIn, buffer)
        await new Promise((resolve, reject) => {
            ffmpeg(tmpFileIn)
                .on("error", reject)
                .on("end", () => resolve(true))
                .addOutputOptions([
                    "-vcodec",
                    "libwebp",
                    "-vf",
                    "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                    "-loop",
                    "0",
                    "-ss",
                    "00:00:00",
                    "-t",
                    "00:00:05",
                    "-preset",
                    "default",
                    "-an",
                    "-vsync",
                    "0"
                ])
                .toFormat("webp")
                .save(tmpFileOut)
        })
        results.buffer = fs.readFileSync(tmpFileOut)
        results.base64 = fs.readFileSync(tmpFileOut).toString("base64")
        results.status = true
        return results
    } catch (error) {
        results.message = util.format(error) 
        return results
    }
}


const writeExif = async (content, type = "image", metadata = {}) => {
    const results = { status: false, buffer: null, base64: null, message: "" }
    try{
        if (type == "image") {
            var { status, buffer, message } = await imageToWebp(content) 
        } else if (type == "video") {
            var { status, buffer, message } = await videoToWebp(content) 
        } else if (type == "sticker") {
            var { status, buffer, message } = await fetchBuffer(content) 
        }
        const tmpFileIn = join("./temp", (fs.readdirSync("./temp").filter((x) => !x.includes("@4.0.4")).length + 1) + ".webp")
        const tmpFileOut = join("./temp", (fs.readdirSync("./temp").filter((x) => !x.includes("@4.0.4")).length + 1) + ".webp")
        if (!status) {
            results.message = message
            return results
        }
        if (metadata?.packName || metadata?.packPublish) {
            fs.writeFileSync(tmpFileIn, buffer)
            const img = new webpmux.Image()
            const object = { 
                "sticker-pack-id": metadata?.packId? metadata.packId : "https://instagram.com/cak_haho",
                "sticker-pack-name": metadata?.packName? metadata.packName : "Demon's BOT", 
                "sticker-pack-publisher": metadata?.packPublish? metadata.packPublish : calender(),
                "sticker-pack-publisher-email": metadata.packEmail? metadata.packEmail : "fandev404@gmail.com",
                "sticker-pack-publisher-website": metadata.packWebsite? metadata.packWebsite : "https://github.com/FanDev404",
                "android-app-store-link": metadata.androidApp? metadata.androidApp : "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
                "ios-app-store-link": metadata.iOSApp? metadata.iOSApp : "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
                "emojis": Array.isArray(metadata.categories)? metadata.categories : ["😋"], 
                "is-avatar-sticker": metadata.isAvatar? metadata.isAvatar : 0
            }
            const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
            const jsonBuff = Buffer.from(JSON.stringify(object), "utf-8")
            const exif = Buffer.concat([exifAttr, jsonBuff])
            exif.writeUIntLE(jsonBuff.length, 14, 4)
            await img.load(tmpFileIn)
            img.exif = exif
            await img.save(tmpFileOut)
            results.buffer = fs.readFileSync(tmpFileOut)
            results.base64 = fs.readFileSync(tmpFileOut).toString("base64")
            results.status = true
        } else {
            results.message = "packName and packPublish."
        }
        return results
    } catch (error) {
        results.message = util.format(error) 
        return results
    }
}
        

const imageToUrl = async (paths) => {
    const result = { status: false, data: "", message: "" }
    const form = new FormData();
    form.append("file", fs.createReadStream(paths))
    return await axios({ 
        "method": "POST",
        "url": "https://telegra.ph/upload", 
        "headers": { 
            ...form.getHeaders() 
        },
        "data": form
    }).then(({ status, data }) => {
        if (status == 200) {
            result.status = true
            result.data = "https://telegra.ph" + data[0].src
        } else {
            result.message = "Server sedang maitance..."
        }
        return result
    }).catch(() => {
        result.message = "Server sedang maitance..."
        return result
    })
}


const uploadFileApi = async (paths) => {
    const result = { status: false, data: "", message: "" }
    const { name, repository, token } = db.settings.local_github
    return await axios({
        "method": "GET",
        "url": "https://api.github.com/repos/" + name + "/" + repository + "/contents",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(async (response) => {
        if (response.status == 200) {
            const fileId = response.data.filter((x) => (x.type == "file" && basename(paths) == x.name)).length + 1
            const fileName = fileId == 1? basename(paths) : basename(paths).split(".").length == 1? fileId : basename(paths).split(".").length == 2? (fileId + "." + basename(paths).split(".")[1]) : basename(paths).split(".").length == 3? (fileId + "." + basename(paths).split(".")[2]) : basename(paths).split(".").length == 4? (fileId + "." + basename(paths).split(".")[3]) : fileId
            await axios({
                "method": "PUT",
                "url": "https://api.github.com/repos/" + name + "/" + repository + "/contents/" + basename(paths),
                "headers": {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                "data": {
                    "message": "File upload!",
                    "content": fs.readFileSync(paths).toString("base64")
                }
            }).then(({ status, data }) => {
                if (status == 200 || status == 201) {
                    result.status = true
                    result.data = data.content.download_url
                } else {
                    result.message = "Terjadi kesalahan saat upload!!"
                }
                return result
            }).catch(() => {
                result.message = "Terjadi kesalahan saat upload!!"
                return result
            })
        } else {
            result.message = "Server sedang maitance..."
        } 
        return result
    }).catch(() => {
        result.message = "Server sedang maitance..."
        return result
    })
}


const editBackground = async (base64, bg_color = "") => {
     const result = { status: false, base64: null, buffer: null, message: "" }
     return await axios({ 
         "method": "POST", 
         "url": "https://api.remove.bg/v1.0/removebg", 
         "data": {
             "image_file_b64": base64,
             "bg_color": bg_color
         },
         "headers": { 
             "accept": "application/json",
             "Content-Type": "application/json",
             "X-Api-Key": db.settings.local_key.remove_background
         }
     }).then(({ status, data }) => {
         if (status == 200) {
             result.status = true
             result.base64 = data.data.result_b64
             result.buffer = new Buffer.from(data.data.result_b64, "base64")
         } else {
             result.message = "Server sedang error"
         }
         return result
     }).catch((error) => {
         if (error.message.includes("401")) {
             result.message = "key kosong ka minta sama owner buat isi"
         } else if (error.message.includes("403")) {
             result.message = "Not access key"
         } else {
             result.message = "Error : " + error.message
         }
         return result
     })
}




module.exports = { imageToWebp, videoToWebp, writeExif, editBackground, imageToUrl, uploadFileApi } 