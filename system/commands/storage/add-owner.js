const { calender, time } = require("@libs/function")
module.exports = {
    commands: ["addowner"],
    tags: "storage menu",
    cooldown: 13,
    isSewa: true,
    isCreator: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
            if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
            if (m.input.includes(m.botNumber)) return m.reply("Itu nomer bot kak") 
            if (m.input.includes(db.devoloper + "@s.whatsapp.net")) return m.reply("Itu nomer dev kak") 
            if (m.input.includes(db.settings.ownerNumber + "@s.whatsapp.net")) return m.reply("User sudah menjadi owner") 
            if (m.input.filter((x) => Object.keys(db.vip).includes(x)).length > 0) return m.reply("isPermanent detect " + m.input.filter((x) => Object.keys(db.vip).includes(x)).map((x) => "@" + x.split("@")[0]).join(" "))
            if (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("second") || m.text.toLowerCase().includes("detik"))) {
                const failed = []
                const success = []
                for(let x of m.input) {
                    if (Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x].expired += time(`${parseFloat(m.text.split("#")[1])}second`)
                    if (!Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}second`) }
                    if ((await sock.onWhatsApp(x)).length > 0) success.push(`@${x.split("@")[0]}`) 
                    if ((await sock.onWhatsApp(x)).length == 0) failed.push(`@${x.split("@")[0]}`) 
                }
                if (success.length > 0 && failed.length > 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" ") + "\n\nFailed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                if (success.length > 0 && failed.length == 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" "))
                if (success.length == 0 && failed.length > 0) m.reply("Failed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                cmdSuccess(command, "storage menu")
            } else if (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("minute") || m.text.toLowerCase().includes("menit"))) {
                const failed = []
                const success = []
                for(let x of m.input) {
                    if (Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x].expired += time(`${parseFloat(m.text.split("#")[1])}minute`)
                    if (!Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}minute`) }
                    if ((await sock.onWhatsApp(x)).length > 0) success.push(`@${x.split("@")[0]}`) 
                    if ((await sock.onWhatsApp(x)).length == 0) failed.push(`@${x.split("@")[0]}`) 
                }
                if (success.length > 0 && failed.length > 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" ") + "\n\nFailed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                if (success.length > 0 && failed.length == 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" "))
                if (success.length == 0 && failed.length > 0) m.reply("Failed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                cmdSuccess(command, "storage menu")
            } else if (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("hour") || m.text.toLowerCase().includes("jam"))) {
                const failed = []
                const success = []
                for(let x of m.input) {
                    if (Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x].expired += time(`${parseFloat(m.text.split("#")[1])}hour`)
                    if (!Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}hour`) }
                    if ((await sock.onWhatsApp(x)).length > 0) success.push(`@${x.split("@")[0]}`) 
                    if ((await sock.onWhatsApp(x)).length == 0) failed.push(`@${x.split("@")[0]}`) 
                }
                if (success.length > 0 && failed.length > 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" ") + "\n\nFailed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                if (success.length > 0 && failed.length == 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" "))
                if (success.length == 0 && failed.length > 0) m.reply("Failed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                cmdSuccess(command, "storage menu")
            } else if (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("day") || m.text.toLowerCase().includes("hari"))) {
                const failed = []
                const success = []
                for(let x of m.input) {
                    if (Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x].expired += time(`${parseFloat(m.text.split("#")[1])}day`)
                    if (!Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}day`) }
                    if ((await sock.onWhatsApp(x)).length > 0) success.push(`@${x.split("@")[0]}`) 
                    if ((await sock.onWhatsApp(x)).length == 0) failed.push(`@${x.split("@")[0]}`) 
                }
                if (success.length > 0 && failed.length > 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" ") + "\n\nFailed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                if (success.length > 0 && failed.length == 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" "))
                if (success.length == 0 && failed.length > 0) m.reply("Failed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                cmdSuccess(command, "storage menu")
            } else if (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("week") || m.text.toLowerCase().includes("minggu"))) {
                const failed = []
                const success = []
                for(let x of m.input) {
                    if (Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x].expired += time(`${parseFloat(m.text.split("#")[1])}week`)
                    if (!Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}week`) }
                    if ((await sock.onWhatsApp(x)).length > 0) success.push(`@${x.split("@")[0]}`) 
                    if ((await sock.onWhatsApp(x)).length == 0) failed.push(`@${x.split("@")[0]}`) 
                }
                if (success.length > 0 && failed.length > 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" ") + "\n\nFailed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                if (success.length > 0 && failed.length == 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" "))
                if (success.length == 0 && failed.length > 0) m.reply("Failed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                cmdSuccess(command, "storage menu")
            } else if (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("month") || m.text.toLowerCase().includes("bulan"))) {
                const failed = []
                const success = []
                for(let x of m.input) {
                    if (Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x].expired += time(`${parseFloat(m.text.split("#")[1])}month`)
                    if (!Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}month`) }
                    if ((await sock.onWhatsApp(x)).length > 0) success.push(`@${x.split("@")[0]}`) 
                    if ((await sock.onWhatsApp(x)).length == 0) failed.push(`@${x.split("@")[0]}`) 
                }
                if (success.length > 0 && failed.length > 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" ") + "\n\nFailed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                if (success.length > 0 && failed.length == 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" "))
                if (success.length == 0 && failed.length > 0) m.reply("Failed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                cmdSuccess(command, "storage menu")
            } else if (!isNaN(parseFloat(m.text.split("#")[1])) && (m.text.toLowerCase().includes("year") || m.text.toLowerCase().includes("tahun"))) {
                const failed = []
                const success = []
                for(let x of m.input) {
                    if (Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x].expired += time(`${parseFloat(m.text.split("#")[1])}year`)
                    if (!Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.owner[x] = { "date": calender(), "expired": Date.now() + time(`${parseFloat(m.text.split("#")[1])}year`) }
                    if ((await sock.onWhatsApp(x)).length > 0) success.push(`@${x.split("@")[0]}`) 
                    if ((await sock.onWhatsApp(x)).length == 0) failed.push(`@${x.split("@")[0]}`) 
                }
                if (success.length > 0 && failed.length > 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" ") + "\n\nFailed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                if (success.length > 0 && failed.length == 0) m.reply("Success add owner " + m.text.split("#")[1] + " to " + success.join(" "))
                if (success.length == 0 && failed.length > 0) m.reply("Failed add owner " + m.text.split("#")[1] + " to " + failed.join(" "))
                cmdSuccess(command, "storage menu")
            } else {
                const failed = []
                const success = []
                for(let x of m.input) {
                    if (Object.keys(db.owner).includes(x) && (await sock.onWhatsApp(x)).length > 0) delete db.owner[x]
                    if (!Object.keys(db.vip).includes(x) && (await sock.onWhatsApp(x)).length > 0) db.vip[x] = { "date": calender(), "expired": "PERMANEN" }
                    if ((await sock.onWhatsApp(x)).length > 0) success.push(`@${x.split("@")[0]}`) 
                    if ((await sock.onWhatsApp(x)).length == 0) failed.push(`@${x.split("@")[0]}`) 
                }
                if (success.length > 0 && failed.length > 0) m.reply("Success add owner to " + success.join(" ") + "\n\nFailed add owner to " + failed.join(" "))
                if (success.length > 0 && failed.length == 0) m.reply("Success add owner to " + success.join(" "))
                if (success.length == 0 && failed.length > 0) m.reply("Failed add owner to " + failed.join(" "))
                cmdSuccess(command, "storage menu")
            }
        } catch (error) {
            cmdFailed(command, "storage menu", error)
        }
    }
}