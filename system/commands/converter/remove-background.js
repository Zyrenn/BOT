const fs = require("fs") 
const util = require("util") 
const path = require("path")
const { exec } = require("child_process")
const { converter } = require("decode.id")
const { editBackground } = require("@libs/localConverter") 
module.exports = {
    commands: ["removebg"],
    tags: "converter menu", 
    cooldown: 13,
    isSewa: true,
    isPremium: true,
    isWait: true, 
    isMedia: {
        isImage: true, 
        isQuotedMedia: {
            isQuotedImage: true, 
            isQuotedSticker: true
        }
    },
    callback: async ({ sock, m, cmdSuccess, cmdFailed, command, isImage, isQuotedImage, isQuotedSticker }) => {
        try {
            if (isImage || isQuotedImage) {
                const media = await sock.downloadMediaMessage(isQuotedImage? m.quoted : m)
                const { status, buffer, message } = await editBackground(media) 
                if (!status) return m.reply(util.format(message))
                await sock.sendMessage(m.chat, { document: buffer, fileName: "Demon's BOT.png", mimetype: "application/bin" }, { quoted: m })
                cmdSuccess(command, "converter menu")
            } else if (isQuotedSticker) {
                const tmpFileIn = path.join("./temp", (fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1) + ".webp")
                const tmpFileOut = path.join("./temp", (fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1) + ".jpg")
                const media = await sock.downloadAndSaveMediaMessage(m.quoted, tmpFileIn)
                exec(`ffmpeg -i ${media} ${tmpFileOut}`, async (err) => {
                    const { status, buffer, message } = await editBackground(fs.readFileSync(tmpFileOut).toString("base64")) 
                    if (!status) return m.reply(util.format(message))
                    const webp = await converter.imageToWebp(buffer) 
                    if (!webp.status) return m.reply(util.format(webp.message)) 
                    await sock.sendMessage(m.chat, { sticker: webp.data.buffer })
                    cmdSuccess(command, "converter menu")
                }) 
            }
        } catch (error) {
            cmdFailed(command, "converter menu", error)
        }
    }
}