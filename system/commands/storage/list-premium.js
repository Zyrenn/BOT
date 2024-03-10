const { timeToEpired } = require("@libs/function")
module.exports = {
    commands: ["listprem"],
    tags: "storage menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (Object.keys(db.premium).length == 0) return m.reply("Tidak ada premium kak ☺") 
            let data = Object.keys(db.premium)
            let teks = "\`\`\`「 LIST PREMIUM 」\`\`\`\n\n"
            for (let x of data) {
                teks += ` *•* Nama : ${Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]}\n *•* User : @${x.split("@")[0]}\n *•* Date : ${db.premium[x].date}\n *•* Expired : ${!isNaN(db.premium[x].expired)? timeToEpired(db.premium[x].expired) : "PERMANENT"}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}