module.exports = {
    commands: ["tovoice"],
    tags: "converter menu", 
    cooldown: 13,
    isSewa: true,
    isWait: true, 
    isMedia: {
        isVideo: true, 
        isQuotedMedia: {
            isQuotedVideo: true,
            isQuotedAudio: true
        }
    },
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command, isVideo, isQuotedVideo, isQuotedAudio }) => {
        try {
            if (isVideo || isQuotedVideo) {
                if (isQuotedVideo && !!m.quoted.message[m.quoted.type]?.gifPlayback || isVideo && !!m.message[m.type]?.gifPlayback) return m.reply("itu gif kak bukan video")
                if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 600 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 600) return m.reply("Sizenya gede banget kak 🙂")
                const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                await sock.sendMessage(m.chat, { audio: media, mimetype: "audio/mpeg", ptt: true }, { quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isQuotedAudio) {
                const media = await sock.downloadMediaMessage(m.quoted)
                await sock.sendMessage(m.chat, { audio: media, mimetype: "audio/mpeg", ptt: true }, { quoted: m })
                cmdSuccess(command, "converter menu")
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}