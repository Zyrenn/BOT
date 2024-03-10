const { generateProfilePicture } = require("@libs/function")
module.exports = {
    commands: ["setppgc"],
    tags: "group menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    isMedia: {
        isImage: true, 
        isQuotedMedia: {
            isQuotedImage: true
        }
    }, 
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed, isQuotedImage, isImage }) => {
        try {
            if (isImage && m.text == "full" || isImage && m.text == "/full" || isQuotedImage && m.text == "full" || isQuotedImage && m.text == "/full") {
                const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
                const { status, data: { img }, message } = await generateProfilePicture(media)
                if (!status) return m.reply(message) 
                await sock.query({ tag: "iq", attrs: { to: m.chat, type: "set", xmlns: "w:profile:picture" }, content: [{ tag: "picture", attrs: { type: "image" }, content: img }]})
                await m.reply("Success changed photo profile")
                cmdSuccess(command, "group menu")
            } else if (isImage || isQuotedImage) {
                const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await sock.updateProfilePicture(m.chat, media)
                await m.reply("Success changed photo profile")
                cmdSuccess(command, "group menu")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}