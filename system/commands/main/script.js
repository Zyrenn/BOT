const fs = require("fs") 
const { exec } = require("child_process")
module.exports = {
    commands: ["script"],
    tags: "main menu", 
    cooldown: 13,
    isSewa: true,
    isWait: true, 
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            exec("zip -r temp/BotWhatsapp.zip connections/Zzzzzzzzzz@4.0.4 database system temp/Zzzzzzzzzz@4.0.4 index.js main.js package.json", (err) => {
                if (err) return cmdFailed(command, "owner menu", err)
                sock.sendMessage(m.chat, { document: fs.readFileSync("temp/BotWhatsapp.zip"), fileName: "BotWhatsapp.zip", mimetype: "application/bin" })
                setTimeout(() => {
                    fs.unlinkSync("temp/BotWhatsapp.zip")
                }, 1000)
            })
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}