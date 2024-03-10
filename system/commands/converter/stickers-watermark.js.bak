const { calender } = require("@libs/function")
const { converter } = require("decode.id")
module.exports = {
    commands: ["swm"],
    tags: "converter menu", 
    example: "{prefix}{command} Punya Nun 😤",
    cooldown: 13,
    isSewa: true,
    isPremium: true,
    isWait: true, 
    isMedia: {
        isImage: true, 
        isVideo: true, 
        isQuotedMedia: {
            isQuotedImage: true, 
            isQuotedVideo: true,
            isQuotedSticker: true
        }
    },
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command, isImage, isVideo, isQuotedImage, isQuotedVideo, isQuotedSticker }) => {
        try {
            if (isImage || isQuotedImage) {
                const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
                const { status, data: { buffer, base64 }, message } = await converter.writeExif(media, { packName: m.text? m.text : "", packPublish: calender() })
                if (!status) return m.reply(message) 
                await sock.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isVideo || isQuotedVideo) {
                if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 10 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 10) return m.reply("Hanya dapat mendownload video sampai 10 detik kak")
                const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                const { status, data: { buffer, base64 }, message } = await converter.writeExif(media, { packName: m.text? m.text : "", packPublish: calender() }) 
                if (!status) return m.reply(message) 
                await sock.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isQuotedSticker) {
                const media = await sock.downloadMediaMessage(m.quoted)
                const { status, data: { buffer, base64 }, message } = await converter.writeExif(media, { packName: m.text? m.text : "", packPublish: calender() }) 
                if (!status) return m.reply(message) 
                await sock.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
                cmdSuccess(command, "converter menu")
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}