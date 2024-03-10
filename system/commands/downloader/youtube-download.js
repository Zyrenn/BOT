const { downloader } = require("decode.id")
module.exports = {
    commands: ["yt"],
    tags: "downloader", 
    expectedArgs: "<link>",
    example: "{prefix}{command} https://youtu.be/mD8v4WUVDGg?si=W_QGsEHIA7sLaU-K@video",
    minArgs: 1,
    cooldown: 13,
    isSewa: true,
    isWait: true,
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command }) => {
        try {
            if (m.text.includes("https://youtube.com/channel/")) return m.reply("Kakak baka 😤")
            if (m.text.includes("https://www.youtube.com/watch?v=") && m.text.split(".com/")[0] == "https://www.youtube" && m.text.split("watch?v=")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://youtu.be/") && m.text.split("youtu.be/")[0] == "https://" && m.text.split("youtu.be/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://youtube.com/watch?v=") && m.text.split(".com/")[0] == "https://youtube" && m.text.split("watch?v=")[1] !== "") {
                var link = m.text.split("@")[0]
            } else if (m.text.includes("https://youtube.com/shorts/") && m.text.split(".com/")[0] == "https://youtube" && m.text.split("shorts/")[1] !== "") {
                var link = m.text.split("@")[0]
            } else return m.reply("Error link")
            const { status, data, message } = await downloader.youtube(link)
            if (!status) return cmdFailed(command, "downloader", message)
            if (m.text.includes("@video") && parseInt(data.details.second) > 600) {
                return m.reply("Sizenya gede banget kak 🙂")
            } else if (parseInt(data.details.second) > 1200) {
                return m.reply("Sizenya gede banget kak 🙂")
            }
            if (m.text.includes("@video")) {
                sock.sendMessage(m.chat, { video: data?.download_mp4?.buffer, mimetype: "video/mp4" }, { quoted: m })
            } else {
                sock.sendMessage(m.chat, { audio: data?.download_mp3?.buffer, mimetype: "audio/mp4" }, { quoted: m })
            }
            cmdSuccess(command, "downloader")
        } catch (error) {
            cmdFailed(command, "downloader", error)
        }
    }
}