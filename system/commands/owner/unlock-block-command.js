module.exports = {
    commands: ["unblockcmd"],
    tags: "owner menu", 
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listCommand = db.blockcmd
            const data = listCommand.filter((x) => (m.text == x || !isNaN(m.text) && Number(m.text) > 0 && Number(m.text) <= listCommand.length && listCommand[Number(m.text) - 1] == x))
            if (data.length > 0) {
                for (const x of data) {
                    db.blockcmd.splice(db.blockcmd.indexOf(x, 1))
                }
                await m.reply("Success unblock command to " + data.join(" "))
                cmdSuccess(command, "owner menu")
            } else {
                if (listCommand.length == 0) return m.reply("Masih kosong kak ☺")
                let teks = "\`\`\`「 UNBLOCK COMMAND 」\`\`\`\n\n"
                let teksID = 1
                for (let x of listCommand) {
                    teks += `${teksID++}. ${x}\n`
                }
                m.reply(teks)
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}