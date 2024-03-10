const { sleep } = require("@libs/function")
module.exports = {
    commands: ["getpp"],
    tags: "main menu", 
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
            for (const x of m.input) {
                try{
                    var thumbnailUrl = await sock.profilePictureUrl(x, "image")
                } catch {
                    var thumbnailUrl = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
                }
                if (m.input.length == 1) await sock.sendMessage(m.chat, { image: { url: thumbnailUrl }}, { quoted: m })
                if (m.input.length > 1) await sock.sendMessage(m.chat, { image: { url: thumbnailUrl }, caption: `@${x.split("@")[0]}`, mentions: m.input }, { quoted: m })
                await sleep(4000)
            }
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}