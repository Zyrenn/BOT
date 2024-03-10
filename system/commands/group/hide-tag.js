module.exports = {
    commands: ["hidetag"],
    tags: "group menu",
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ sock, m, groupMembers, command, cmdSuccess, cmdFailed, isImage, isVideo, isDocument, isText, isQuotedDocument, isQuotedImage, isQuotedVideo, isQuotedText }) => {
        try {
            if (isImage || isQuotedImage) {
                const teks = (m.text == "" && isQuotedImage)? m.quoted.body : m.text
                const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
                await sock.sendMessage(m.chat, { image: media, caption: teks, contextInfo: { mentionedJid: groupMembers, isForwarded: true, forwardingScore: 999 }})
                cmdSuccess(command, "group menu")
            } else if (isVideo || isQuotedVideo) {
                const teks = (m.text == "" && isQuotedVideo)? m.quoted.body : m.text
                const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                await sock.sendMessage(m.chat, { video: media, caption: teks, mimetype: "video/mp4", contextInfo: { mentionedJid: groupMembers, isForwarded: true, forwardingScore: 999 }})
                cmdSuccess(command, "group menu")
            } else if (isDocument || isQuotedDocument) {
                const teks = (m.text == "" && isQuotedDocument)? m.quoted.body : m.text
                const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
                const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
                await sock.sendMessage(m.chat, { document: media, caption: teks, fileName, mimetype: "application/bin", contextInfo: { mentionedJid: groupMembers, isForwarded: true, forwardingScore: 999 }})
                cmdSuccess(command, "group menu")
            } else {
                if (!isText) return m.reply("Text?")
                const teks = (m.text == "" && isQuotedText)? m.quoted.body : m.text
                await sock.sendMessage(m.chat, { text: teks, contextInfo: { mentionedJid: groupMembers, isForwarded: true, forwardingScore: 999 }})
                cmdSuccess(command, "group menu")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}