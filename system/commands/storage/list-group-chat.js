const moment = require("moment-timezone")
module.exports = {
    commands: ["listgc"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            let data = (await sock.getAllGroups(true)) 
            let teks = "\`\`\`「 LIST GROUP CHAT 」\`\`\`\n\n"
            for (const x of data) {
                teks += ` *•* ID : ${x.id}\n *•* Name : ${x.subject}\n *•* Owner : ${x.owner !== undefined? "@" + x.owner.split("@")[0] : "Tidak diketahui"}\n *•* Creation : ${moment(x.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n *•* Total Admin : ${x.participants.filter((x) => x.admin !== null).length}\n *•* Total Member : ${x.participants.length}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}