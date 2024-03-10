const { converter } = require("decode.id")
module.exports = {
    commands: ["s"],
    tags: "converter menu", 
    cooldown: 13,
    isSewa: true,
    isWait: true, 
    isMedia: {
        isImage: true, 
        isVideo: true, 
        isQuotedMedia: {
            isQuotedImage: true, 
            isQuotedVideo: true
        }
    },
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command, isImage, isVideo, isQuotedImage, isQuotedVideo }) => {
        try {
            if (isImage || isQuotedImage) {
                const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
                const { status, data: { buffer, base64 }, message } = await converter.imageToWebp(media) 
                if (!status) return m.reply(message) 
                await sock.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isVideo || isQuotedVideo) {
                if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 10 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 10) return m.reply("Hanya dapat mendownload video sampai 10 detik kak")
                const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                const { status, data: { buffer, base64 }, message } = await converter.videoToWebp(media) 
                if (!status) return m.reply(message) 
                await sock.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
                cmdSuccess(command, "converter menu")
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}