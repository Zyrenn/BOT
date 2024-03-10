module.exports = {
    commands: ["listblock"],
    tags: "storage menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            let data = await sock.fetchBlocklist()
            if (data.length == 0) return m.reply("Masih kosong kak ☺") 
            let teks = "┌──⭓「 *LIST BLOCK* 」\n│\n"
            for (let x of data) {
                teks += `│⭔ @${x.split("@")[0]}\n`
            }
            teks += `│\n└────────────⭓\n\n*Total ada : ${data.length}*`
            m.reply(teks)
            cmdSuccess(command, "storage menu")
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}