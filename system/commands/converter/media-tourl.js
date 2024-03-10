const fs = require("fs") 
const util = require("util") 
const i18n = require("i18n") 
const { imageToUrl, uploadFileApi } = require("@libs/localConverter")
module.exports = {
    commands: ["tourl"],
    tags: "converter menu", 
    cooldown: 13,
    isSewa: true,
    isMedia: {
        isImage: true,
        isVideo: true, 
        isDocument: true,
        isQuotedMedia: {
            isQuotedImage: true,
            isQuotedVideo: true,
            isQuotedAudio: true,
            isQuotedSticker: true,
            isQuotedDocument: true
        }
    },
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed, isImage, isVideo, isDocument, isQuotedVideo, isQuotedImage, isQuotedDocument, isQuotedSticker, isQuotedAudio }) => {
        try {
            if (isImage || isQuotedImage) {
                const id = fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1
                const media = await sock.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".jpg")
                const { status, data, message } = await imageToUrl(media) 
                if (!status) return m.reply(util.format(message))
                m.reply(data) 
                cmdSuccess(command, "converter menu")
            } else if (isVideo || isQuotedVideo) {
                if (!m.isPremium && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 600 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 600) return m.reply("Sizenya gede banget kak 🙂")
                const id = fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1
                const media = await sock.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".mp4")
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply(data) 
                cmdSuccess(command, "converter menu")
            } else if (isDocument || isQuotedDocument) {
                if (!m.isPremium && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1
                const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
                const media = await sock.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), `${fileName.includes(".")? (id + fileName.split(".")[1]) : id}`)
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply(data) 
                cmdSuccess(command, "converter menu")
            } else if (isQuotedSticker) {
                if (!m.isPremium && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1
                const media = await sock.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".webp")
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply(data) 
                cmdSuccess(command, "converter menu")
            } else if (isQuotedAudio) {
                if (!m.isPremium && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1
                const media = await sock.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".mp3")
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply(data) 
                cmdSuccess(command, "converter menu")
            } else if (isQuotedAudio) {
                if (!m.isPremium && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
                const id = fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1
                const media = await sock.downloadAndSaveMediaMessage((m.quoted? m.quoted : m), id + ".mp3")
                const { status, data, message } = await uploadFileApi(media) 
                if (!status) return m.reply(util.format(message))
                m.reply(data) 
                cmdSuccess(command, "converter menu")
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}