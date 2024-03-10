const moment = require("moment-timezone") 
const { time, calender } = require("@libs/function")
exports.loadDatabase = async (m) => {
    if (!db.chats.includes(m.chat) && m.chat !== m.botNumber) db.chats.push(m.chat) 
//================================================================\\
    if (Object.keys(db.dashboard).includes(calender())) {
        if (!("commands" in db.dashboard[calender()])) db.dashboard[calender()].commands = {}
    } else db.dashboard[calender()] = { 
        "commands": {} 
    }
//================================================================\\
    if (m.isGroup && Object.keys(db.groups).includes(m.chat)) {
        if (!("anti_link" in db.groups[m.chat])) db.groups[m.chat].anti_link = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_youtube" in db.groups[m.chat])) db.groups[m.chat].anti_link_youtube = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_facebook" in db.groups[m.chat])) db.groups[m.chat].anti_link_facebook = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_instagram" in db.groups[m.chat])) db.groups[m.chat].anti_link_instagram = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_telegram" in db.groups[m.chat])) db.groups[m.chat].anti_link_telegram = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_whatsapp" in db.groups[m.chat])) db.groups[m.chat].anti_link_whatsapp = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_tiktok" in db.groups[m.chat])) db.groups[m.chat].anti_link_tiktok = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_link_twitter" in db.groups[m.chat])) db.groups[m.chat].anti_link_twitter = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_virtex" in db.groups[m.chat])) db.groups[m.chat].anti_virtex = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_tag" in db.groups[m.chat])) db.groups[m.chat].anti_tag = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_toxic" in db.groups[m.chat])) db.groups[m.chat].anti_toxic = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_sange" in db.groups[m.chat])) db.groups[m.chat].anti_sange = {
            "status": false, 
            "type": "delete"
        }
        if (!("anti_asing" in db.groups[m.chat])) db.groups[m.chat].anti_asing = false
        if (!("anti_delete" in db.groups[m.chat])) db.groups[m.chat].anti_delete = false
        if (!("anti_view_once" in db.groups[m.chat])) db.groups[m.chat].anti_view_once = false
        if (!("mute" in db.groups[m.chat])) db.groups[m.chat].mute = false
        if (!("welcome" in db.groups[m.chat])) db.groups[m.chat].welcome = false
        if (!("store" in db.groups[m.chat])) db.groups[m.chat].store = { 
            "payment": { 
                "text": "", 
                "image": "" 
            }, 
            "image": "", 
            "proses": "", 
            "done": "", 
            "key": {} 
        }
        if (!("sewa" in db.groups[m.chat])) db.groups[m.chat].sewa = { 
            "status": (Object.keys(db.sewa).includes(m.chat) || db.settings.vipSewa.includes(m.chat))? false : true, 
            "date": calender(), 
            "expired": (Object.keys(db.sewa).includes(m.chat) || db.settings.vipSewa.includes(m.chat))? 0 : Date.now() + time("1days") 
        }
        if (!("settings_welcome" in db.groups[m.chat])) db.groups[m.chat].settings_welcome = { 
            "add": "BEBAN GROUP NAMBAH LAGI :V", 
            "remove": "BEBAN GROUP KELUAR :V", 
            "promote": "CIEE YANG BARU JADI ADMIN GROUP", 
            "demote": "CIEE YANG BARU JADI MEMBER GROUP"
        }
        if (!Array.isArray(db.groups[m.chat].afk_group)) db.groups[m.chat].afk_group = []
        if (!m.isNumber(db.groups[m.chat].limit)) db.groups[m.chat].limit = 200
    } else if (m.isGroup) db.groups[m.chat] = {
        "anti_link": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_youtube": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_facebook": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_instagram": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_telegram": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_whatsapp": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_tiktok": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_link_twitter": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_virtex": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_tag": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_toxic": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_sange": {
            "status": false, 
            "type": "delete"
        }, 
        "anti_asing": false, 
        "anti_delete": false, 
        "anti_view_once": false, 
        "mute": false, 
        "welcome": false, 
        "store": { 
            "payment": { 
                "text": "", 
                "image": "" 
            }, 
            "image": "", 
            "proses": "", 
            "done": "", 
            "key": {} 
        }, 
        "sewa": { 
            "status": (Object.keys(db.sewa).includes(m.chat) || db.settings.vipSewa.includes(m.chat))? false : true, 
            "date": calender(), 
            "expired": (Object.keys(db.sewa).includes(m.chat) || db.settings.vipSewa.includes(m.chat))? 0 : Date.now() + time("1days") 
        },
        "settings_welcome": { 
            "add": "BEBAN GROUP NAMBAH LAGI :V", 
            "remove": "BEBAN GROUP KELUAR :V", 
            "promote": "CIEE YANG BARU JADI ADMIN GROUP", 
            "demote": "CIEE YANG BARU JADI MEMBER GROUP"
        }, 
        "afk_group": [],
        "limit": 200
    }
//================================================================\\
    if (Object.keys(db.users).includes(m.sender)) {
        if (!("name" in db.users[m.sender])) db.users[m.sender].name = m.pushName
        if (!("date" in db.users[m.sender])) db.users[m.sender].date = calender()
        if (!("level" in db.users[m.sender])) db.users[m.sender].level = (m.isOwner || Object.keys(db.premium).includes(m.sender))? "Primordial Glory" : "Low Tier"
        if (!m.isNumber(db.users[m.sender].xp)) db.users[m.sender].xp = 1
        if (!m.isNumber(db.users[m.sender].balance)) db.users[m.sender].balance = (m.isOwner || Object.keys(db.premium).includes(m.sender))? "Unlimited" : 0
        if (!m.isNumber(db.users[m.sender].limit)) db.users[m.sender].limit = (m.isOwner || Object.keys(db.premium).includes(m.sender))? "Unlimited" : db.settings.limitAwal
        if (Object.keys(db.users[m.sender]).includes("name") && m.pushName !== "No Name" && db.users[m.sender].name !== m.pushName) { 
            db.users[m.sender].name = m.pushName 
        }
        if (Object.keys(db.users[m.sender]).includes("level") && (m.key.fromMe? true : (m.isOwner || Object.keys(db.premium).includes(m.sender))) && db.users[m.sender].level !== "Primordial Glory") { 
            db.users[m.sender].level = "Primordial Glory" 
        }
        if (Object.keys(db.users[m.sender]).includes("limit") && (m.key.fromMe? true : (m.isOwner || Object.keys(db.premium).includes(m.sender))) && !isNaN(db.users[m.sender].limit)) {
            db.users[m.sender].limit = "Unlimited"
        }
        if (Object.keys(db.users[m.sender]).includes("balance") && (m.key.fromMe? true : (m.isOwner || Object.keys(db.premium).includes(m.sender))) && !isNaN(db.users[m.sender].balance)) {
            db.users[m.sender].balance = "Unlimited"
        }
        if (Object.keys(db.users[m.sender]).includes("level") && !(m.isOwner || Object.keys(db.premium).includes(m.sender)) && db.users[m.sender].level == "Primordial Glory") {
            db.users[m.sender].level = "Low Tier"
        }
        if (Object.keys(db.users[m.sender]).includes("limit") && !(m.isOwner || Object.keys(db.premium).includes(m.sender)) && isNaN(db.users[m.sender].limit)) {
            db.users[m.sender].limit = db.settings.limitAwal
        }
        if (Object.keys(db.users[m.sender]).includes("balance") && !(m.isOwner || Object.keys(db.premium).includes(m.sender)) && isNaN(db.users[m.sender].balance)) {
            db.users[m.sender].balance = 0
        }
        if (db.settings.autoLevel && !m.key.fromMe && !(m.isOwner || Object.keys(db.premium).includes(m.sender))) {
            if (db.users[m.sender].xp >= 3 && db.users[m.sender].level === "Low Tier") {
                let levelRole = "Warrior III"
                let levelRoleSebelum = "Low Tier"
                let limitNumber = randomNomor(7) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 6 && db.users[m.sender].level === "Warrior III") {
                let levelRole = "Warrior II"
                let levelRoleSebelum = "Warrior III"
                let limitNumber = randomNomor(11) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 9 && db.users[m.sender].level === "Warrior II") {
                let levelRole = "Warrior I"
                let levelRoleSebelum = "Warrior II"
                let limitNumber = randomNomor(15) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 12 && db.users[m.sender].level === "Warrior I") {
                let levelRole = "Elite III"
                let levelRoleSebelum = "Warrior I"
                let limitNumber = randomNomor(19) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 16 && db.users[m.sender].level === "Elite III") {
                let levelRole = "Elite II"
                let levelRoleSebelum = "Elite III"
                let limitNumber = randomNomor(25) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 20 && db.users[m.sender].level === "Elite II") {
                let levelRole = "Elite I"
                let levelRoleSebelum = "Elite II"
                let limitNumber = randomNomor(31) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 24 && db.users[m.sender].level === "Elite I") {
                let levelRole = "Master IV"
                let levelRoleSebelum = "Elite I"
                let limitNumber = randomNomor(37) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 29 && db.users[m.sender].level === "Master IV") {
                let levelRole = "Master III"
                let levelRoleSebelum = "Master IV"
                let limitNumber = randomNomor(45)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 34 && db.users[m.sender].level === "Master III") {
                let levelRole = "Master II"
                let levelRoleSebelum = "Master III"
                let limitNumber = randomNomor(53) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 39 && db.users[m.sender].level === "Master II") {
                let levelRole = "Master I"
                let levelRoleSebelum = "Master II"
                let limitNumber = randomNomor(61) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 44 && db.users[m.sender].level === "Master I") {
                let levelRole = "GrandMaster V"
                let levelRoleSebelum = "Master I"
                let limitNumber = randomNomor(69) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 50 && db.users[m.sender].level === "GrandMaster V") {
                let levelRole = "GrandMaster IV"
                let levelRoleSebelum = "GrandMaster V"
                let limitNumber = randomNomor(79) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 56 && db.users[m.sender].level === "GrandMaster IV") {
                let levelRole = "GrandMaster III"
                let levelRoleSebelum = "GrandMaster IV"
                let limitNumber = randomNomor(89) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 62 && db.users[m.sender].level === "GrandMaster III") {
                let levelRole = "GrandMaster II"
                let levelRoleSebelum = "GrandMaster III"
                let limitNumber = randomNomor(99) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 68 && db.users[m.sender].level === "GrandMaster II") {
                let levelRole = "GrandMaster I"
                let levelRoleSebelum = "GrandMaster II"
                let limitNumber = randomNomor(109) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 74 && db.users[m.sender].level === "GrandMaster I") {
                let levelRole = "Epic V"
                let levelRoleSebelum = "GrandMaster I"
                let limitNumber = randomNomor(119) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 81 && db.users[m.sender].level === "Epic V") {
                let levelRole = "Epic IV"
                let levelRoleSebelum = "Epic V"
                let limitNumber = randomNomor(131) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 88 && db.users[m.sender].level === "Epic IV") {
                let levelRole = "Epic III"
                let levelRoleSebelum = "Epic IV"
                let limitNumber = randomNomor(143) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 95 && db.users[m.sender].level === "Epic III") {
                let levelRole = "Epic II"
                let levelRoleSebelum = "Epic III"
                let limitNumber = randomNomor(155) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 102 && db.users[m.sender].level === "Epic II") {
                let levelRole = "Epic I"
                let levelRoleSebelum = "Epic II"
                let limitNumber = randomNomor(167) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 109 && db.users[m.sender].level === "Epic I") {
                let levelRole = "Legend V"
                let levelRoleSebelum = "Epic I"
                let limitNumber = randomNomor(179) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 116 && db.users[m.sender].level === "Legend V") {
                let levelRole = "Legend IV"
                let levelRoleSebelum = "Legend V"
                let limitNumber = randomNomor(193) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 124 && db.users[m.sender].level === "Legend IV") {
                let levelRole = "Legend III"
                let levelRoleSebelum = "Legend IV"
                let limitNumber = randomNomor(207) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 132 && db.users[m.sender].level === "Legend III") {
                let levelRole = "Legend II"
                let levelRoleSebelum = "Legend III"
                let limitNumber = randomNomor(221) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 140 && db.users[m.sender].level === "Legend II") {
                let levelRole = "Legend I"
                let levelRoleSebelum = "Legend II"
                let limitNumber = randomNomor(235) 
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            } else if (db.users[m.sender].xp >= 148 && db.users[m.sender].level === "Legend I") {
                let levelRole = "Mythical Glory"
                let levelRoleSebelum = "Legend I"
                let limitNumber = randomNomor(249)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            }
        } else if (db.settings.autoLevel && (m.key.fromMe || (m.isOwner || Object.keys(db.premium).includes(m.sender)) || db.users[m.sender].level === "Mythical Glory") && db.users[m.sender].level !== "Primordial Glory") {
            const levelRole = "Primordial Glory"
            const levelRoleSebelum = "Mythical Glory"
            const limitNumber = randomNomor(165)
            if (db.users[m.sender].level !== "Primordial Glory") {
                db.users[m.sender].level = levelRole
                db.users[m.sender].balance += Number(limitNumber * 1000)
                db.users[m.sender].limit += Number(limitNumber)
                let teks = "\`\`\`「  LEVEL UP  」\`\`\`\n\n"
                teks += `▸ Name : ${m.pushName}\n`
                teks += `▸ Users : @${m.sender.split("@")[0]}\n`
                teks += `▸ Saldo : + ${Number(limitNumber * 1000)}\n`
                teks += `▸ Limit : + ${Number(limitNumber)}\n`
                teks += `▸ Level : ${levelRoleSebelum} => ${levelRole}\n`
                teks += `▸ Clock : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}`
                m.reply(teks)
            }
        } 
    } else db.users[m.sender] = {
        "name": m.pushName,
        "date": calender(), 
        "level": (m.isOwner || Object.keys(db.premium).includes(m.sender))? "Primordial Glory" : "Low Tier",
        "xp": 1,
        "balance": (m.isOwner || Object.keys(db.premium).includes(m.sender))? "Unlimited" : 0,
        "limit": (m.isOwner || Object.keys(db.premium).includes(m.sender))? "Unlimited" : db.settings.limitAwal
    }
//================================================================\\


}