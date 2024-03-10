module.exports = {
    commands: ["listban"],
    tags: "storage menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            let data = Object.keys(db.banned)
            let teks = "\`\`\`「 LIST BANNED 」\`\`\`\n\n"
            if (data.length == 0) return m.reply("Masih kosong kak ☺") 
            for (let x of data) {
                teks += ` *•* Nama : ${Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]}\n *•* User : @${x.split("@")[0]}\n *•* Date : ${db.banned[x].date}\n *•* Reason : ${db.banned[x].reason}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}