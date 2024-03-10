module.exports = {
    commands: ["toaudio"],
    tags: "converter menu", 
    cooldown: 13,
    isSewa: true,
    isWait: true, 
    isMedia: {
        isVideo: true, 
        isQuotedMedia: {
            isQuotedVideo: true,
            isQuotedVoice: true
        }
    },
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command, isVideo, isQuotedVideo, isQuotedVoice }) => {
        try {
            if (isVideo || isQuotedVideo) {
                if (isQuotedVideo && !!m.quoted.message[m.quoted.type]?.gifPlayback || isVideo && !!m.message[m.type]?.gifPlayback) return m.reply("itu gif kak bukan video")
                if (isQuotedVideo && Object.keys(m.quoted.message[m.quoted.type]).includes("seconds") && m.quoted.message[m.quoted.type].seconds > 600 || isVideo && Object.keys(m.message[m.type]).includes("seconds") && m.message[m.type].seconds > 600) return m.reply("Sizenya gede banget kak 🙂")
                const media = await sock.downloadMediaMessage(isQuotedVideo? m.quoted : m)
                await sock.sendMessage(m.chat, { audio: media, mimetype: "audio/mp4" }, { quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isQuotedVoice) {
                const media = await sock.downloadMediaMessage(m.quoted)
                await sock.sendMessage(m.chat, { audio: media, mimetype: "audio/mp4" }, { quoted: m })
                cmdSuccess(command, "converter menu")
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}