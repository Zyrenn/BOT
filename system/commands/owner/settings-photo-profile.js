const { generateProfilePicture } = require("@libs/function")
module.exports = {
    commands: ["setpp"],
    tags: "owner menu", 
    cooldown: 13,
    isSewa: true,
    isOwner: true,
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
                await sock.query({ tag: "iq", attrs: { to: m.botNumber, type: "set", xmlns: "w:profile:picture" }, content: [{ tag: "picture", attrs: { type: "image" }, content: img }]})
                await m.reply("Success changed photo profile")
                cmdSuccess(command, "owner menu")
            } else if (isImage || isQuotedImage) {
                const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await sock.updateProfilePicture(m.botNumber, media)
                await m.reply("Success changed photo profile")
                cmdSuccess(command, "owner menu")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}