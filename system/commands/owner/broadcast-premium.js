const { sleep } = require("@libs/function")
module.exports = {
    commands: ["bcprem"],
    tags: "owner menu", 
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed, isImage, isVideo, isDocument, isQuotedDocument, isQuotedImage, isQuotedVideo }) => {
        try {
            const data = Object.keys(db.premium).filter(async (x) => {
                return (x !== m.chat && ((await sock.onWhatsApp(x)).length > 0) && !(await m.isBlock(x))) 
            }) 
            if (isImage || isQuotedImage) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
                const mentionedJid = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net") 
                for (let x of data) {
                    await sock.sendMessage(x, { image: media, caption: teks, contextInfo: { mentionedJid, isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else if (isVideo || isQuotedVideo) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                const mentionedJid = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net") 
                for (let x of data) {
                    await sock.sendMessage(x, { video: media, caption: teks, mimetype: "video/mp4", contextInfo: { mentionedJid, isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else if (isDocument || isQuotedDocument) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
                const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
                const mentionedJid = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net") 
                for (let x of data) {
                    await sock.sendMessage(x, { document: media, caption: teks, fileName, mimetype: "application/bin", contextInfo: { mentionedJid, isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else {
                if (!m.text) return m.reply("Text?")
                const teks = "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text
                const mentionedJid = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net") 
                for (let x of data) {
                    await sock.sendMessage(x, { text: teks, contextInfo: { mentionedJid, isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}