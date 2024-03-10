const { calender, time, randomCode } = require("@libs/function")
module.exports = {
    commands: ["addsewa"],
    tags: "storage menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text.includes("chat.whatsapp.com/")) {
                if (m.text.split(".com/")[1] == "") return m.reply("Error link")
                var jid = await sock.groupAcceptInvite(m.text.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0]) 
                var expired = (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("second") || m.text.toLowerCase().includes("detik")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}second`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("minute") || m.text.toLowerCase().includes("menit")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}minute`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("hour") || m.text.toLowerCase().includes("jam")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}hour`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("day") || m.text.toLowerCase().includes("hari")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}day`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("week") || m.text.toLowerCase().includes("minggu")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}week`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("month") || m.text.toLowerCase().includes("bulan")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}month`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("year") || m.text.toLowerCase().includes("tahun")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}year`)) : "PERMANEN"
            } else if (m.quoted && m.quoted.body.includes("chat.whatsapp.com/")) {
                if (m.quoted.body.split(".com/")[1] == "") return m.reply("Error link")
                var jid = await sock.groupAcceptInvite(m.quoted.body.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0])
                var expired = (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("second") || m.text.toLowerCase().includes("detik")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}second`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("minute") || m.text.toLowerCase().includes("menit")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}minute`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("hour") || m.text.toLowerCase().includes("jam")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}hour`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("day") || m.text.toLowerCase().includes("hari")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}day`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("week") || m.text.toLowerCase().includes("minggu")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}week`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("month") || m.text.toLowerCase().includes("bulan")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}month`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("year") || m.text.toLowerCase().includes("tahun")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}year`)) : "PERMANEN"
            } else if (!isNaN(parseFloat(m.text)) && m.text.includes("@g.us")) {
                var jid = m.text.split("#")[0].split(" ").filter((x) => x !== "")[0]
                var expired = (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("second") || m.text.toLowerCase().includes("detik")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}second`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("minute") || m.text.toLowerCase().includes("menit")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}minute`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("hour") || m.text.toLowerCase().includes("jam")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}hour`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("day") || m.text.toLowerCase().includes("hari")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}day`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("week") || m.text.toLowerCase().includes("minggu")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}week`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("month") || m.text.toLowerCase().includes("bulan")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}month`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("year") || m.text.toLowerCase().includes("tahun")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}year`)) : "PERMANEN"
            } else if (m.isGroup) {
                var jid = m.chat
                var expired = (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("second") || m.text.toLowerCase().includes("detik")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}second`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("minute") || m.text.toLowerCase().includes("menit")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}minute`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("hour") || m.text.toLowerCase().includes("jam")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}hour`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("day") || m.text.toLowerCase().includes("hari")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}day`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("week") || m.text.toLowerCase().includes("minggu")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}week`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("month") || m.text.toLowerCase().includes("bulan")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}month`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("year") || m.text.toLowerCase().includes("tahun")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}year`)) : "PERMANEN"
            } else {
                var jid = "code"
                var expired = (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("second") || m.text.toLowerCase().includes("detik")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}second`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("minute") || m.text.toLowerCase().includes("menit")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}minute`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("hour") || m.text.toLowerCase().includes("jam")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}hour`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("day") || m.text.toLowerCase().includes("hari")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}day`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("week") || m.text.toLowerCase().includes("minggu")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}week`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("month") || m.text.toLowerCase().includes("bulan")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}month`)) : (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("year") || m.text.toLowerCase().includes("tahun")))? (Date.now() + time(`${parseFloat(m.text.split("#")[1])}year`)) : "PERMANEN"
            }
            if (jid == "code") {
                const code = randomCode() 
                db.code[code] = { "expired": !isNaN(expired)? m.text.split("#")[1] : "PERMANEN" }
                m.reply(code)
                cmdSuccess(command, "storage menu")
            } else {
                if (db.settings.vipSewa.includes(jid)) return m.reply("Sudah sewa permanet kak") 
                if (Object.keys(db.sewa).includes(jid) && db.sewa[jid].expired == "PERMANEN") {
                    return m.reply("Sudah sewa permanet kak")
                }
                if (Object.keys(db.sewa).includes(jid) && !isNaN(expired)) db.sewa[jid].expired += expired
                if (Object.keys(db.sewa).includes(jid) && expired == "PERMANEN") db.sewa[jid].expired = expired
                if (!Object.keys(db.sewa).includes(jid)) db.sewa[jid] = { "date": calender(), "expired": expired }
                if (Object.keys(db.groups).includes(jid) && db.groups[jid].sewa.status) db.groups[jid].sewa.status = false
                if (Object.keys(db.groups).includes(jid) && db.groups[jid].sewa.expired) db.groups[jid].sewa.expired = 0
                const metadata = (await sock.groupMetadata(jid).catch(e => {})) || {}
                const groupName = Object.keys(metadata).length > 0? metadata?.subject : ""
                m.reply(`Success add sewa${!isNaN(expired) && groupName? (" " + m.text.split("#")[1]) : ""}${!isNaN(expired) && groupName? (" to " + groupName) : ""}`)
                cmdSuccess(command, "storage menu")
            }
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}