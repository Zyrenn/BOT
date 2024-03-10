const fs = require("fs") 
const { exec } = require("child_process")
module.exports = {
    commands: ["backup"],
    tags: "owner menu", 
    cooldown: 13,
    isSewa: true,
    isCreator: true, 
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            exec("zip -r temp/BotWhatsapp.zip connections database system/config", (err) => {
                if (err) return cmdFailed(command, "owner menu", err)
                sock.sendMessage(m.chat, { document: fs.readFileSync("temp/BotWhatsapp.zip"), fileName: "BotWhatsapp.zip", mimetype: "application/bin" })
                setTimeout(() => {
                    fs.unlinkSync("temp/BotWhatsapp.zip")
                }, 1000)
            })
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}