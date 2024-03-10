module.exports = {
    commands: ["delsewa"],
    tags: "storage menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, groupName, command, cmdSuccess, cmdFailed }) => {
        try {
            const results = (await sock.getAllGroups(true)).filter((x) => Object.keys(db.sewa).includes(x.id))
            const data = results.filter((x) => (m.quoted && m.text !== "" && m.quoted.body == x.id || m.quoted && m.text !== "" && m.quoted.text == x.id || m.text == x.subject || m.text == x.id || !isNaN(m.text) && Number(m.text) > 0 && Number(m.text) <= results.length && results[Number(m.text) -1]?.id == x.id)) 
            if (m.text.includes("chat.whatsapp.com/")) {
                if (m.text.split(".com/")[1] == "") return m.reply("Error link")
                const jid = await sock.groupAcceptInvite(m.text.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0]) 
                if (!Object.keys(db.sewa).includes(jid)) return m.reply("Kakak masukin apa itu, ko ada di list sewa ka")
                if (Object.keys(db.sewa).includes(jid)) delete db.sewa[jid]
                const metadata = (await sock.groupMetadata(jid).catch(e => {})) || {}
                const subject = Object.keys(metadata).length > 0? metadata?.subject : ""
                m.reply(`Success delete sewa${subject? (" to " + subject) : ""}`)
                cmdSuccess(command, "storage menu")
            } else if (m.quoted && m.quoted.body.includes("chat.whatsapp.com/")) {
                if (m.quoted.body.split(".com/")[1] == "") return m.reply("Error link")
                const jid = await sock.groupAcceptInvite(m.quoted.body.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0])
                if (!Object.keys(db.sewa).includes(jid)) return m.reply("Kakak masukin apa itu, ko ada di list sewa ka")
                if (Object.keys(db.sewa).includes(jid)) delete db.sewa[jid]
                const metadata = (await sock.groupMetadata(jid).catch(e => {})) || {}
                const subject = Object.keys(metadata).length > 0? metadata?.subject : ""
                m.reply(`Success delete sewa${subject? (" to " + subject) : ""}`)
                cmdSuccess(command, "storage menu")
            } else if (!isNaN(parseFloat(m.text)) && m.text.includes("@g.us")) {
                const jid = m.text.split("#")[0].split(" ").filter((x) => x !== "")[0]
                if (!Object.keys(db.sewa).includes(jid)) return m.reply("Kakak masukin apa itu, ko ada di list sewa ka")
                if (Object.keys(db.sewa).includes(jid)) delete db.sewa[jid]
                const metadata = (await sock.groupMetadata(jid).catch(e => {})) || {}
                const subject = Object.keys(metadata).length > 0? metadata?.subject : ""
                m.reply(`Success delete sewa${subject? (" to " + subject) : ""}`)
                cmdSuccess(command, "storage menu")
            } else if (data.length > 0) {
                const success = []
                for(const x of data) {
                    if (Object.keys(db.sewa).includes(x.id)) delete db.sewa[x.id]
                    if (!success.includes(x.subject)) success.push(x.subject) 
                }
                await m.reply("Success delete sewa to " + success.join(" "))
                cmdSuccess(command, "storage menu")          
            } else if (m.isGroup) {
                if (!Object.keys(db.sewa).includes(m.chat)) return m.reply("Kakak masukin apa itu, ko ada di list sewa ka")
                if (Object.keys(db.sewa).includes(m.chat)) delete db.sewa[m.chat]
                m.reply(`Success delete sewa${groupName? (" to " + groupName) : ""}`)
                cmdSuccess(command, "storage menu")
            } else {
                if (results.length == 0) return m.reply("Tidak ada sewa kak ☺")
                let teks = "\`\`\`「 DELETE SEWA 」\`\`\`\n\n"
                let teksID = 1
                for (let x of results) {
                    teks += results.map(({ id }) => id).includes(x.id)? `${teksID++}. ${x.subject}\n` : ""
                }
                m.reply(teks)
            }
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}