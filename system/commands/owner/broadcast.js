const { sleep } = require("@libs/function")
module.exports = {
    commands: ["bc"],
    tags: "owner menu", 
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed, isImage, isVideo, isDocument, isQuotedDocument, isQuotedImage, isQuotedVideo }) => {
        try {
            const data = [
                ...db.chats.filter((x) => (x.endsWith("@s.whatsapp.net") && x !== m.chat)), 
                ...(await sock.getAllGroups(true)).filter(({ id, participants, announce }) => (id !== m.chat && participants.filter((x) => x.admin !== null).map((x) => x.id).includes(m.botNumber) && announce || id !== m.chat && !announce)).map((x) => x.id) 
            ]
            if (isImage || isQuotedImage) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
                for (let x of data) {
                    const metadata = x.endsWith("@g.us")? (await sock.groupMetadata(x).catch(e => {})) : {}
                    const mention = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net") 
                    const mentionedJid = [...(Object.keys(metadata).length > 0? metadata.participants.map((x) => x.id) : []), ...mention]
                    await sock.sendMessage(x, { image: media, caption: teks, contextInfo: { mentionedJid, isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else if (isVideo || isQuotedVideo) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                for (let x of data) {
                    const metadata = x.endsWith("@g.us")? (await sock.groupMetadata(x).catch(e => {})) : {}
                    const mention = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net") 
                    const mentionedJid = [...(Object.keys(metadata).length > 0? metadata.participants.map((x) => x.id) : []), ...mention]
                    await sock.sendMessage(x, { video: media, caption: teks, mimetype: "video/mp4", contextInfo: { mentionedJid, isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else if (isDocument || isQuotedDocument) {
                const teks = m.text? "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text : "\`\`\`「  BROADCAST MESSAGE  」\`\`\`"
                const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
                const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
                for (let x of data) {
                    const metadata = x.endsWith("@g.us")? (await sock.groupMetadata(x).catch(e => {})) : {}
                    const mention = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net") 
                    const mentionedJid = [...(Object.keys(metadata).length > 0? metadata.participants.map((x) => x.id) : []), ...mention]
                    await sock.sendMessage(x, { document: media, caption: teks, fileName, mimetype: "application/bin", contextInfo: { mentionedJid, isForwarded: true, forwardingScore: 999 }})
                    await sleep(2000)
                }
                m.reply(`Success send broadcast message to ${data.length} chats`)
                cmdSuccess(command, "owner menu")
            } else {
                if (!m.text) return m.reply("Text?")
                const teks = "\`\`\`「  BROADCAST MESSAGE  」\`\`\`\n\n" + m.text
                for (let x of data) {
                    const metadata = x.endsWith("@g.us")? (await sock.groupMetadata(x).catch(e => {})) : {}
                    const mention = [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net") 
                    const mentionedJid = [...(Object.keys(metadata).length > 0? metadata.participants.map((x) => x.id) : []), ...mention]
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