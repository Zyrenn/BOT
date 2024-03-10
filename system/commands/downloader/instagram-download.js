const { downloader } = require("decode.id")
module.exports = {
    commands: ["ig"],
    tags: "downloader", 
    expectedArgs: "<link>",
    example: "{prefix}{command} https://www.instagram.com/reel/CuOxTilAfci/?igshid=NjIwNzIyMDk2Mg%3D%3D@video",
    minArgs: 1,
    cooldown: 13,
    isSewa: true,
    isWait: true,
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command }) => {
        try {
            if (!m.text.startsWith("https://www.instagram.com/")) return m.reply("Itu bukan link Instagram ka")
            if (m.text.includes("https://www.instagram.com/") && m.text.split(".com/")[0] == "https://www.instagram" && m.text.split(".com/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else return m.reply("Error link")
            const { status, data, message } = await downloader.instagram(m.text)
            if (!status) return cmdFailed(command, "downloader", message)
            var failed = 0
            for (const x of data) {
                if (x.type == "video" && !(m.text.includes("@image") || m.text.includes("@video")) && m.text.includes("@audio")) {
                    sock.sendMessage(m.chat, { audio: x.buffer, mimetype: "audio/mp4" }, { quoted: m })
                } else if (x.type == "video" && !(m.text.includes("@image") || m.text.includes("@audio")) || x.type == "video" && m.text.includes("@video")) {
                    sock.sendMessage(m.chat, { video: x.buffer, mimetype: "video/mp4" }, { quoted: m })
                } else if (x.type == "image" && !(m.text.includes("@video") || m.text.includes("@audio")) || x.type == "image" && m.text.includes("@image")) {
                    sock.sendMessage(m.chat, { image: x.buffer }, { quoted: m })
                } else {
                    failed += 1
                }
            }
            if (data.length == failed) return m.reply("Format failed") 
            cmdSuccess(command, "downloader")
        } catch (error) {
            cmdFailed(command, "downloader", error)
        }
    }
}