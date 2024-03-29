const { timeToEpired } = require("@libs/function")
module.exports = {
    commands: ["listowner"],
    tags: "storage menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if ([...Object.keys(db.vip), ...Object.keys(db.owner)].length == 0) return m.reply("Tidak ada owner kak ☺") 
            let data = [...Object.keys(db.vip), ...Object.keys(db.owner)] 
            let teks = "\`\`\`「 LIST OWNER 」\`\`\`\n\n"
            for (let x of data) {
                teks += ` *•* Nama : ${Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]}\n *•* User : @${x.split("@")[0]}\n *•* Date : ${Object.keys(db.vip).includes(x)? db.vip[x].date : Object.keys(db.owner).includes(x)? db.owner[x].date : ""}\n *•* Expired : ${Object.keys(db.vip).includes(x)? "PERMANENT" : timeToEpired(db.owner[x].expired)}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}