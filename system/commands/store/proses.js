const moment = require("moment-timezone")
const { calender } = require("@libs/function")
module.exports = {
    commands: ["proses"],
    tags: "store menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (db.groups[m.chat].store.proses == "") return m.reply("Belum ada proses di group ini")
            const text = m.quoted? m.quoted.body : m.isMention? "" : ""
            const users = m.quoted && m.isMention && m.mentionedJid.includes(m.quoted.sender)? m.mentionedJid : m.isMention && m.quoted? [...m.mentionedJid, m.quoted.sender] : m.isMention? m.mentionedJid : m.quoted? Array(m.quoted.sender) : []
            const teks1 = db.groups[m.chat].store["proses"]
            const teks2 = teks1.split("{calender}").length > 0? teks1.split("{calender}").join(calender()) : teks1
            const teks3 = teks2.split("{time}").length > 0? teks2.split("{time}").join(moment().tz("Asia/Jakarta").format("HH:mm:ss")) : teks2
            const teks4 = teks3.split("{note}").length > 0? teks3.split("{note}").join(text) : teks3
            const teks5 = teks4.split("@{users}").length > 0? teks4.split("@{users}").join(users.map((x) => ("@" + x.split("@")[0])).join("")) : teks4
            const teks6 = teks5.split("{users}").length > 0? teks5.split("{users}").join(users.map((x) => x.split("@")[0]).join("")) : teks5
            m.reply(teks6)
            cmdSuccess(command, "store menu")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}