const fs = require("fs")
const util = require("util")
const path = require("path")
const { exec } = require("child_process")
module.exports = {
    commands: ["toimg"],
    tags: "converter menu", 
    cooldown: 13,
    isSewa: true,
    isWait: true, 
    isMedia: {
        isQuotedMedia: {
            isQuotedSticker: true
        }
    },
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command }) => {
        try {
            const tmpFileIn = path.join("./temp", (fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1) + ".webp")
            const tmpFileOut = path.join("./temp", (fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1) + ".jpg")

            const media = await sock.downloadAndSaveMediaMessage(m.quoted, tmpFileIn)

            exec(`ffmpeg -i ${media} ${tmpFileOut}`, async (err) => {
                if (err) return m.reply(util.format(err)) 
                await sock.sendMessage(m.chat, { image: fs.readFileSync(tmpFileOut) }, { quoted: m })
                cmdSuccess(command, "converter menu")
            })
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}