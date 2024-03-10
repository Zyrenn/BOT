const { downloader } = require("decode.id")
module.exports = {
    commands: ["tiktok"],
    tags: "downloader", 
    expectedArgs: "<link>",
    example: "{prefix}{command} https://vt.tiktok.com/ZSwWCk5o/@audio",
    minArgs: 1,
    cooldown: 13,
    isSewa: true,
    isLimit: true,
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command }) => {
        try {
            if (m.text.includes("https://vt.tiktok.com/") && m.text.split(".com/")[0] == "https://vt.tiktok" && m.text.split(".com/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://vm.tiktok.com/") && m.text.split(".com/")[0] == "https://vm.tiktok" && m.text.split(".com/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://www.tiktok.com/") && m.text.split(".com/")[0] == "https://www.tiktok" && m.text.split(".com/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else return m.reply("Error link")
            const { status, data, message } = await downloader.tiktok(link)
            if (!status && Object.keys(db.sewa).includes(m.chat) && !m.key.fromMe && !m.isPremium) {
                db.groups[m.chat].limit += 1
                return cmdFailed(command, "downloader", message + ", limit group akan kembali 1")
            } else if (!status && !m.key.fromMe && !m.isPremium) {
                db.users[m.sender].limit += 1
                return cmdFailed(command, "downloader", message + ", limit kamu akan kembali 1")
            } else if (!status) return cmdFailed(command, "downloader", message)
            if (m.text.includes("@audio")) {
                const { buffer } = data.audio
                sock.sendMessage(m.chat, { audio: buffer, mimetype: "audio/mp4" }, { quoted: m })
            } else if (data.type == "video")  {
                const { buffer } = data.video
                sock.sendMessage(m.chat, { video: buffer, mimetype: "video/mp4" }, { quoted: m })
            } else if (data.type == "image")  {
                for (const x of data.image) {
                    sock.sendMessage(m.chat, { image: x.buffer }, { quoted: m })
                }
            }
            cmdSuccess(command, "downloader")
        } catch (error) {
            cmdFailed(command, "downloader", error)
        }
    }
}