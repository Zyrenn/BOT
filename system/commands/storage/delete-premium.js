module.exports = {
    commands: ["delprem"],
    tags: "storage menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            const listPremium = Object.keys(db.premium)
            const data = listPremium.filter((x) => (m.input.includes(x) || !isNaN(m.text) && Number(m.text) > 0 && Number(m.text) <= listPremium.length && listPremium[Number(m.text) - 1] == x))
            if (data.length == 0 && m.input.length > 0) {
                if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
                if (m.input.filter((x) => !listPremium.includes(x)).length > 0) return m.reply("No premium detect to list " + m.input.filter((x) => !listPremium.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                for (const x of m.input) {
                    delete db.premium[x]
                }
                await m.reply("Success delete premium to " + m.input.map((x) => "@" + x.split("@")[0]).join(" "))
                cmdSuccess(command, "storage menu")
            } else if (data.length > 0) {
                for(const x of data) {
                    if (Object.keys(db.premium).includes(x)) delete db.premium[x]
                }
                await m.reply("Success delete premium to " + data.map((x) => "@" + x.split("@")[0]).join(" "))
                cmdSuccess(command, "storage menu")
            } else {
                if (listPremium.length == 0) return m.reply("Tidak ada premium kak ☺")
                let teks = "\`\`\`「 DELETE PREMIUM 」\`\`\`\n\n"
                let teksID = 1
                for (let x of listPremium) {
                    teks += `${teksID++}. @${x.split("@")[0]}\n`
                }
                m.reply(teks)
            }
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}