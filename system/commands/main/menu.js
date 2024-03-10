const fs = require("fs") 
const { commands } = require("@libs/collection")
const { calender, toFirstCase, fetchBuffer, checkCommand } = require("@libs/function")
module.exports = {
    commands: ["menu"],
    tags: "main menu", 
    cooldown: 13,
    callback: async ({ sock, m, prefix, thePrefix, command, cmdSuccess, cmdFailed }) => {
        try {
            let teks = ""
            let data = Object.keys(db.allcommand).map((x) => { return { tags_menu: db.allcommand[x].tags_menu.toUpperCase(), name: x } }).filter((x) => x.tags_menu !== "").filter((x) => (m.text.toLowerCase() == command? true : x.tags_menu.startsWith(m.text.toUpperCase())? true : m.text.toUpperCase() == ""? true : false ))
            let menu_name = []
            let teksPetik = (text) => {
                 return "```" + text + "```"
            }
            let statusCmd = (cmd) => {
                 const options = (commands.get(cmd) || {})
                 if (Object.keys(db.listerror).includes(cmd)) {
                     return " 「 _Error_ 」 ❌"
                 } else if (Object.keys(options).length > 0 && options?.isCreator || checkCommand(cmd, "isCreator") == true && db.allcommand[cmd].type == "case") {
                     return " 🅒"
                 } else if (Object.keys(options).length > 0 && options?.isOwner || checkCommand(cmd, "isOwner") == true && db.allcommand[cmd].type == "case") {
                     return " 🅞"
                 } else if (Object.keys(options).length > 0 && options?.isGroup || checkCommand(cmd, "isGroup") == true && db.allcommand[cmd].type == "case") {
                     return " 🅖"
                 } else if (Object.keys(options).length > 0 && options?.isPremium || checkCommand(cmd, "isPremium") == true && db.allcommand[cmd].type == "case") {
                     return " 🅟"
                 } else if (Object.keys(options).length > 0 && options?.isLimit) {
                     return " 🅛"
                 } else {
                     return " 🅕"
                 }
            }
            for (let x of data) {
                if (!menu_name.includes(x.tags_menu)) menu_name.push(x.tags_menu) 
            }
            if (data.length == 0) return m.reply("Menu not found") 
            teks += `${teksPetik("Halo, @" + m.senderNumber + " 👋")}\n`
            teks += `${teksPetik("Selamat datang di Demon's BOT")}\n`
            teks += `${teksPetik("bot ini masih dalam proses pengembangan!!")}\n\n`
            teks += `${teksPetik("𖢖 ═══ Demon's BOT ═══ 𖢖")}\n`
            teks += `${teksPetik("✬ Library : Baileys-MD")}\n`
            teks += `${teksPetik("✬ Mode : " + toFirstCase(db.settings.mode))}\n`
            teks += `${teksPetik("✬ Date : " + calender())}\n`
            teks += `${teksPetik("✬ Prefix : " + thePrefix)}\n`
            teks += `${teksPetik("✬ Total Feature : " + Object.keys(db.allcommand).length)}\n`
            teks += `${teksPetik("✬ Total Error : " + Object.keys(db.listerror).length)}\n`
            teks += `${teksPetik("✬ Total User : " + Object.keys(db.users).length)}\n`
            teks += `${teksPetik("✬ Total Banned : " + Object.keys(db.banned).length)}\n`
            teks += `${teksPetik("𖢖 ═══ MY ACCOUNT ═══ 𖢖")}\n`
            teks += `${teksPetik("✬ Nama : " + (m.pushName == "No Name"? m.senderNumber : m.pushName))}\n`
            teks += `${teksPetik("✬ Status : " + (db.devoloper == m.senderNumber? "Devoloper" : (m.isCreator || m.key.fromMe)? "Creator" : m.isOwner? "Owner" : Object.keys(db.premium).includes(m.sender)? "Premium" : "Free Users"))}\n`
            teks += `${teksPetik("✬ Limit : " + db.users[m.sender].limit)}\n`
            teks += `${teksPetik("✬ Saldo : " + db.users[m.sender].balance)}\n`
            teks += `${teksPetik("✬ Level : " + db.users[m.sender].level)}\n`
            teks += `${teksPetik("𖢖 ═════════════════ 𖢖")}\n`
            for (let a of menu_name) {
                teks += `\n⦿ *${a}*\n`
                for (let b of data) {
                    teks += `${b.tags_menu == a? (teksPetik("⌬ " + prefix + b.name + statusCmd(b.name)) + "\n") : ""}`
                }
            }
            teks += `\n\n${teksPetik("2024 © 𝑳𝒊𝒈𝒉𝒕𝒘𝒆𝒊𝒈𝒉𝒕 𝒘𝒉𝒂𝒕𝒔𝒂𝒑𝒑 𝒃𝒐𝒕")}\n`
            try{
                var thumbnailUrl = await sock.profilePictureUrl(m.sender, "image")
            } catch {
                var thumbnailUrl = "https://raw.githubusercontent.com/Aztecs444/media/Zeck/image/profilePicture.jpg"
            }
            const { status, buffer, message } = await fetchBuffer(thumbnailUrl)
            if (!status) return m.reply(message) 
            sock.sendMessage(m.chat, { 
                "text": teks, 
                "contextInfo": { 
                    "mentionedJid": [m.sender], 
                    "externalAdReply": { 
                        "showAdAttribution": true, 
                        "title": "Hallo kak👋", 
                        "body": "DONT CLICK HERE", 
                        "previewType": "PHOTO", 
                        "thumbnail": buffer, 
                        "sourceUrl": "https://wa.me/" + db.settings.ownerNumber 
                    }
                }
            }, { quoted: m })
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}