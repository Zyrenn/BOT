const { timeToEpired } = require("@libs/function")
module.exports = {
    commands: ["listsewa"],
    tags: "storage menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            const data = (await sock.getAllGroups(true)).filter((x) => Object.keys(db.sewa).includes(x.id))
            if (data.length == 0) return m.reply("Masih kosong kak ☺") 
            let teks = "\`\`\`「 LIST SEWA 」\`\`\`\n\n"
            for (const x of data) {
                teks += ` *•* ID : ${x.id}\n *•* Name : ${x.subject}\n *•* Date : ${db.sewa[x.id].date}\n *•* Expired : ${!isNaN(db.sewa[x.id].expired)? timeToEpired(db.sewa[x.id].expired) : db.sewa[x.id].expired}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}