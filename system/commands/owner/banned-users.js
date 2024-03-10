const { calender } = require("@libs/function")
module.exports = {
    commands: ["ban"],
    tags: "owner menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
            if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
            if (m.input.includes(m.botNumber)) return m.reply("Itu nomer bot kak") 
            if (m.input.includes(db.devoloper + "@s.whatsapp.net")) return m.reply("Itu nomer dev kak") 
            if (m.input.includes(db.settings.ownerNumber + "@s.whatsapp.net")) return m.reply("Itu nomer owner kak") 
            if (m.input.filter((x) => Object.keys(db.banned).includes(x)).length > 0) return m.reply("Banned detect to list " + m.input.filter((x) => Object.keys(db.banned).includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
            const failed = []
            const success = []
            for (const x of m.input) {
                if ((await sock.onWhatsApp(x)).length > 0) db.banned[x] = { "date": calender(), "reason": "Not found" }
                if ((await sock.onWhatsApp(x)).length > 0) success.push(`@${x.split("@")[0]}`) 
                if ((await sock.onWhatsApp(x)).length == 0) failed.push(`@${x.split("@")[0]}`) 
            }
            if (success.length > 0 && failed.length > 0) m.reply("Success banned to " + success.join(" ") + "\n\nFailed banned to " + failed.join(" "))
            if (success.length > 0 && failed.length == 0) m.reply("Success banned to " + success.join(" "))
            if (success.length == 0 && failed.length > 0) m.reply("Failed banned to " + failed.join(" "))
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}