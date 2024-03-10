const { sleep } = require("@libs/function")
const { pterodactyl } = require("decode.id")
module.exports = {
    commands: ["addurs"],
    cooldown: 13,
    tags: "panel menu", 
    isSewa: true,
    isPremium: true,
    callback: async ({ m, cmdSuccess, cmdFailed, command }) => {
        try {
            if (m.input.length > 0) {
                if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
                for (const x of m.input) {
                    var { status, data, message } = await pterodactyl?.createUsers(db?.settings?.pterodactyl?.localhost, { "application_key": db?.settings?.pterodactyl?.application_key })
                    let teks = "\`\`\`「  INFO ACCOUNT  」\`\`\`\n\n"
                    if (status) teks += `▸ ID : ${data.id}\n`
                    if (status) teks += `▸ Email : ${data.email}\n`
                    if (status) teks += `▸ Username : ${data.username}\n`
                    if (status) teks += `▸ Password : ${data.first_name}\n`
                    if (status) teks += `▸ Admins : ${data.root_admin? "Yes" : "No"}\n`
                    if (status) teks += `▸ Link : ${db?.settings?.pterodactyl?.localhost}\n\n`
                    if (status) teks +=  "Note : jangan mengganti password atau username biarkan bot yang mengurus semua"
                    if (status && !Object.keys(db.pterodactyl).includes(x)) db.pterodactyl[x] = {
                        "expired": (x.split("@")[0] === db.devoloper || x.split("@")[0] === db.settings.ownerNumber || x === m.botNumber || Object.keys(db.owner).includes(x) || Object.keys(db.vip).includes(x))? "PERMANEN" : 2592000000,
                        "data": [{
                            "id": data?.id, 
                            "email": data?.email, 
                            "username": data?.username, 
                            "password": data?.first_name, 
                            "root_admin": data?.root_admin, 
                            "servers": []
                        }]
                    }
                    if (status && Object.keys(db.pterodactyl).includes(x)) db.pterodactyl[x].data.push({
                        "id": data?.id, 
                        "email": data?.email, 
                        "username": data?.username, 
                        "password": data?.first_name, 
                        "root_admin": data?.root_admin, 
                        "servers": []
                    }) 
                    if (status) m.reply(teks, x) 
                    if (status) await sleep(3000)
                }
                if (status) {
                    m.reply("Success create users " + m.input.map((x) => "@" + x.split("@")[0]).join(" ")) 
                    cmdSuccess(command, "panel menu")
                } else {
                    m.reply(message) 
                }
            } else {
                let teks = "\`\`\`「  INFO ACCOUNT  」\`\`\`\n\n"
                let { status, data, message } = await pterodactyl?.createUsers(db?.settings?.pterodactyl?.localhost, { "application_key": db?.settings?.pterodactyl?.application_key })
                if (status) {
                    teks += `▸ ID : ${data.id}\n`
                    teks += `▸ Email : ${data.email}\n`
                    teks += `▸ Username : ${data.username}\n`
                    teks += `▸ Password : ${data.first_name}\n`
                    teks += `▸ Admins : ${data.root_admin? "Yes" : "No"}\n`
                    teks += `▸ Link : ${db?.settings?.pterodactyl?.localhost}\n\n`
                    teks +=  "Note : jangan mengganti password atau username biarkan bot yang mengurus semua"
                    if (!Object.keys(db.pterodactyl).includes(m.sender)) db.pterodactyl[m.sender] = {
                        "expired": (x.split("@")[0] === db.devoloper || x.split("@")[0] === db.settings.ownerNumber || x === m.botNumber || Object.keys(db.owner).includes(x) || Object.keys(db.vip).includes(x))? "PERMANEN" : 2592000000,
                        "data": [{
                            "id": data?.id, 
                            "email": data?.email, 
                            "username": data?.username, 
                            "password": data?.first_name, 
                            "root_admin": data?.root_admin, 
                            "servers": []
                        }]
                    }
                    if (Object.keys(db.pterodactyl).includes(m.sender)) db.pterodactyl[m.sender].data.push({
                        "id": data?.id, 
                        "email": data?.email, 
                        "username": data?.username, 
                        "password": data?.first_name, 
                        "root_admin": data?.root_admin, 
                        "servers": []
                    }) 
                    m.reply(teks, m.sender)
                    if (m.isGroup) m.reply("Success create users")
                    cmdSuccess(command, "panel menu")
                } else {
                    m.reply(message) 
                }
            }
        } catch (error) {
            cmdFailed(command, "panel menu", error)
        }
    }
}