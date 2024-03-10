module.exports = {
    commands: ["listpc"],
    tags: "storage menu",
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            let data = db.chats.filter((x) => x.includes("@s.whatsapp.net"))
            let teks = "\`\`\`「 LIST PRIVATE CHAT 」\`\`\`\n\n"
            if (data.length == 0) return m.reply("Kosong kak ☺") 
            for (let x of data) {
                teks += ` *•* Nama : ${Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]}\n *•* User : @${x.split("@")[0]}\n *•* Chat : https://wa.me/${x.split("@")[0]}\n\n────────────────\n\n`
            }
            teks += `\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}