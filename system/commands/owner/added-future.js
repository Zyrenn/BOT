const fs = require("fs") 
module.exports = {
    commands: ["addfuture"],
    tags: "owner menu", 
    example: "{prefix}{command} folder",
    cooldown: 13,
    isSewa: true,
    isCreator: true,
    isMedia: {
        isDocument: true, 
        isQuotedMedia: {
            isQuotedDocument: true
        }
    }, 
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed, isQuotedDocument }) => {
        try {
            const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
            if (fs.readdirSync("./system/commands").filter((x) => x.toLowerCase() == m.text.toLowerCase()).length == 0) fs.mkdirSync("./system/commands/" + m.text.toLowerCase(), { recursive: true })
            if (fs.readdirSync("./system/commands/" + m.text).includes(fileName)) return m.reply("Coba pakai nama file lain")
            const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
            m.reply("Success add file to command, Restaring bot...")
            fs.writeFileSync("./system/commands/" + m.text + "/" + fileName, media)
            setTimeout(() => {
                process.send("reset")
            }, 3000)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}