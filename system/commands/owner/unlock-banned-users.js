module.exports = {
    commands: ["unban"],
    tags: "owner menu", 
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listBanned = Object.keys(db.banned)
            const data = listBanned.filter((x) => (m.input.includes(x) || !isNaN(m.text) && Number(m.text) > 0 && Number(m.text) <= listBanned.length && listBanned[Number(m.text) - 1] == x))
            if (data.length == 0 && m.input.length > 0) {
                if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
                if (m.input.filter((x) => !listBanned.includes(x)).length > 0) return m.reply("No banned detect to list " + m.input.filter((x) => !listBanned.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                for (const x of m.input) {
                    delete db.banned[x]
                }
                await m.reply("Success unbanned to " + m.input.map((x) => "@" + x.split("@")[0]).join(" "))
                cmdSuccess(command, "owner menu")
            } else if (data.length > 0) {
                for (const x of data) {
                    delete db.banned[x]
                }
                await m.reply("Success unbanned to " + data.map((x) => "@" + x.split("@")[0]).join(" "))
                cmdSuccess(command, "owner menu")
            } else {
                if (listBanned.length == 0) return m.reply("Masih kosong kak ☺")
                let teks = "\`\`\`「 UNBANNED USERS 」\`\`\`\n\n"
                let teksID = 1
                for (let x of listBanned) {
                    teks += `${teksID++}. @${x.split("@")[0]}\n`
                }
                m.reply(teks)
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}