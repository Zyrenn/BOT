const util = require("util") 
const { resizeImage } = require("@libs/function")
module.exports = {
    commands: ["resize"],
    tags: "converter menu", 
    cooldown: 13,
    isSewa: true,
    isWait: true, 
    isMedia: {
        isImage: true, 
        isQuotedMedia: {
            isQuotedImage: true
        }
    },
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed, isQuotedImage }) => {
        try {
            if (!m.text.includes("x")) return m.reply("Invalid example!!")
            if (m.text.split("x").filter((x) => !isNaN(Number(x))).length < 2) return m.reply("Invalid example!!")
            const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
            const { status, base64, buffer, message } = await resizeImage(media, m.text.split("x")[0], m.text.split("x")[1]) 
            if (!status) return m.reply(util.format(message))
            await sock.sendMessage(m.chat, { image: buffer }, { quoted: m }) 
            cmdSuccess(command, "converter menu")
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}