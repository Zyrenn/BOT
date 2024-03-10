const { getContentType } = require("@adiwajshing/baileys")
module.exports = {
    commands: ["rvo"],
    tags: "converter menu", 
    cooldown: 13,
    isSewa: true,
    isMedia: {
        isViewOnce: true, 
        isQuotedMedia: {
            isQuotedViewOnce: true
        }
    },
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command, isQuotedViewOnce }) => {
        try {
            const media = await sock.downloadMediaMessage(isQuotedViewOnce? m.quoted : m)
            if ((isQuotedViewOnce? getContentType(m.quoted.message) : getContentType(m.message)) == "videoMessage") sock.sendMessage(m.chat, { video: media, caption: isQuotedViewOnce? m.quoted.body : m.body, mimetype: "video/mp4" }, { quoted: m })
            if ((isQuotedViewOnce? getContentType(m.quoted.message) : getContentType(m.message)) == "imageMessage") sock.sendMessage(m.chat, { image: media, caption: isQuotedViewOnce? m.quoted.body : m.body }, { quoted: m })
            cmdSuccess(command, "converter menu")
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}