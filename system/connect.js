const { 
    DisconnectReason, 
    useMultiFileAuthState, 
    makeInMemoryStore, 
} = require("@adiwajshing/baileys")
const fs = require("fs")
const util = require("util") 
const pino = require("pino")
const path = require("path") 
const chalk = require("chalk")
const axios = require("axios") 
const stable = require("json-stable-stringify") 
const moment = require("moment-timezone") 
const { exec } = require("child_process")
const { Boom } = require("@hapi/boom")
const { commands } = require("@libs/collection")
const { localUpdate } = require("@libs/localUpdate")
const { loadDatabase } = require("@message/database")
const { callingMessage } = require("@message/calling-message.js")
const { Message, readCommands } = require("@message/msg") 
const { serialize, makeWASocket } = require("@libs/serialize")
const { decodeJid, calender, time, question, checkCommand } = require("@libs/function")
//const groupMessage = require("@message/group")
//=================================================//
const database = JSON.parse(fs.readFileSync("database/db.json"))
const dbStore = JSON.parse(fs.readFileSync("database/store.json"))
const settings = JSON.parse(fs.readFileSync("system/config/settings.json")) 
//=================================================//
global.db = {
    "allcommand": {},
    "anonymous": [],
    "antispam": {},
    "banned": {},
    "blockcmd": [],
    "chats": [], 
    "code": {},
    "cooldown": {},
    "dashboard": {}, 
    "devoloper": "6289674310267",
    "groups": {},
    "linkpreview": {},
    "listerror": {},
    "message": dbStore, 
    "owner": {},
    "premium": {},
    "pterodactyl": {}, 
    "users": {},
    "settings": {
        "ownerName": settings?.ownerName,
        "ownerNumber": settings?.ownerNumber,
        "mode": settings?.mode,
        "replyType": settings?.replyType,
        "setPrefix": settings?.setPrefix,
        "antiCall": settings?.antiCall,
        "antiSpam": settings?.antiSpam,
        "autoBlockCmd": settings?.autoBlockCmd,
        "autoLevel": settings?.autoLevel,
        "autoReport": settings?.autoReport,
        "autoRead": settings?.autoRead,
        "autoJoin": settings?.autoJoin,
        "pairing_code": settings?.pairing_code,
        "limitAwal": settings?.limitAwal,
        "pterodactyl": {
            "localhost": settings?.pterodactyl?.localhost, 
            "application_key": settings?.pterodactyl?.application_key, 
            "locations_id": settings?.pterodactyl?.locations_id, 
            "eggs_id": settings?.pterodactyl?.eggs_id
        },
        "local_github": {
            "name": settings?.local_github?.name, 
            "repository": settings?.local_github?.repository, 
            "token": settings?.local_github?.token
        },
        "local_backup": {
            "status": settings?.local_backup?.status, 
            "time": settings?.local_backup?.time
        },
        "local_key": {
            "open_ai": settings?.local_key?.open_ai, 
            "remove_background": settings?.local_key?.remove_background
        },
        "vipSewa": settings?.vipSewa
    }, 
    "sewa": {},
    "vip": {},
    ...(database || {})
}
//=================================================//
exports.connectToWhatsApp = async() => {
    const isActive = { status: true }
    const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) })
    const { state, saveCreds } = await useMultiFileAuthState("./connections")
    //=================================================//
    const sock = makeWASocket({
        printQRInTerminal: !db.settings?.pairing_code,
        generateHighQualityLinkPreview: true,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ["Chrome (Linux)", "", ""]
    })
    //=================================================//
    if (db.settings?.pairing_code && !sock.authState?.creds?.registered) {
        let code = ""
        let phone = await question("\n\n\nSilahkan masukin nomor whatsapp :\n\n")
        let remakeNumber = (util.format(phone).replace(new RegExp("[()+-/ +/]", "gi"), "")).trim()
        let phoneNumber = remakeNumber.startsWith("08")? remakeNumber.replace("08", "628") : remakeNumber
        let data = Array.from(await sock.requestPairingCode(phoneNumber.trim())) 
        for (const x of data) {
            if (code.length == 4) code += "-"
            code += x
        }
        console.log(`\n\n\n⚠︎ Kode Pairing Bot Whatsapp kamu : ${code}`)
    }
    //=================================================//
    store.bind(sock.ev)
    //=================================================//
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, receivedPendingNotifications } = update
        if (connection == "connecting" || receivedPendingNotifications == false) {
            console.log("Connecting...")
        } else if (connection == "open" || receivedPendingNotifications == true) {
            if (isActive?.status) console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ CONNECT ]"), "Connecting to the WhatsApp bot....")
            if (isActive?.status == true) isActive.status = false
            readCommands()
            localUpdate() 
        } else if (connection === "close") {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (lastDisconnect.error == "Error: Stream Errored (unknown)") {
                this.connectToWhatsApp()
            } else if (reason == DisconnectReason.badSession) {
                console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Bad Session File, Please Delete Session and Scan Again")
                this.connectToWhatsApp()
            } else if (reason == DisconnectReason.connectionClosed) {
                console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection closed, reconnecting....")
                this.connectToWhatsApp()
            } else if (reason == DisconnectReason.connectionLost) {
                console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection Lost from Server, reconnecting....")
                this.connectToWhatsApp()
            } else if (reason == DisconnectReason.connectionReplaced) {
                console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection Replaced, Another New Session Opened, Please Close Current Session First")
                sock.logout()
            } else if (reason == DisconnectReason.loggedOut) {
                console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Device Logged Out, Please Scan Again And Run.")
                sock.logout()
            } else if (reason == DisconnectReason.restartRequired) {
                console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Restart Required, Restarting....")
                this.connectToWhatsApp()
            } else if (reason == DisconnectReason.timedOut) {
                console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Connection TimedOut, Reconnecting....")
                this.connectToWhatsApp()
            }
        } 
    })
    //=================================================//
    setInterval(() => {
        if (db.settings?.local_backup?.status) {
            const timeWib = moment().locale("id").tz("Asia/Jakarta").format("dddd, DD MMMM YYYY HH:mm:ss")
            exec("zip -r temp/BotWhatsapp.zip connections database system/config", (errors) => {
                if (errors) return
                sock.sendMessage(db.settings?.ownerNumber + "@s.whatsapp.net", { document: fs.readFileSync("temp/BotWhatsapp.zip"), fileName: "BotWhatsapp.zip", mimetype: "application/bin", caption: timeWib })
                setTimeout(() => {
                    fs.unlinkSync("temp/BotWhatsapp.zip")
                }, 1000)
            })
        }
    }, Number(time(db.settings?.local_backup?.time)))
    //=================================================//
    setInterval(() => {
        if (Object.keys(db.cooldown).length > 0) {
            for(const x of Object.keys(db.cooldown)) {
                try{ 
                    var cooldown = db.cooldown[x].expired
                } catch {
                    var cooldown = 0
                }
                if (Date.now() >= cooldown) {
                    delete db.cooldown[x]
                }
            }
        }
        //=================================================//
        if (Object.keys(db.antispam).length > 0) {
            for(const x of Object.keys(db.antispam)) {
                try{ 
                    var cooldown = db.antispam[x].expired
                } catch {
                    var cooldown = 0
                }
                if (Date.now() >= cooldown) {
                    delete db.antispam[x]
                }
            }
        }
        //=================================================//
        for(const x of fs.readdirSync("./").filter((x) => !["connections","database","node_modules","system","temp","index.js","main.js","package.json"].includes(x))) {
            exec("rm -rf " + x)
        }
        //=================================================//
        for(const x of Object.keys(db.users).filter((x) => (db.users[x].date !== calender() && !isNaN(db.users[x].limit) && db.users[x].limit < db.settings.limitAwal))) {
            db.users[x].limit = db.settings.limitAwal
        }
        //=================================================//
        for(const x of Object.keys(db.users).filter((x) => db.users[x].date !== calender())) {
            db.users[x].date = calender()
        }
        //=================================================//
        for(const x of Object.keys(db.dashboard).filter((x) => !x.includes(calender()))) {
            delete db.dashboard[x]
        }
        //=================================================//
        for(const x of Object.keys(db.allcommand).filter((x) => db.allcommand[x].type == "file")) {
            if (Object.keys((commands.get(x) || {})).length == 0) delete db.allcommand[x]
        }
        //=================================================//
        for(const x of Object.keys(db.allcommand).filter((x) => db.allcommand[x].type == "case")) {
            if (checkCommand(x) == null) delete db.allcommand[x]
        }
        //=================================================//
        for(let x = 0; x < (fs.readdirSync("connections").filter((x) => x == "Zzzzzzzzzz@4.0.4").length == 0? 1 : 0); x++) {
            fs.writeFileSync("connections/Zzzzzzzzzz@4.0.4", Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])) 
        }
        //=================================================//
        for(let x = 0; x < (fs.readdirSync("temp").filter((x) => x == "Zzzzzzzzzz@4.0.4").length == 0? 1 : 0); x++) {
            fs.writeFileSync("temp/Zzzzzzzzzz@4.0.4", Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])) 
        }
    }, 500)
    //=================================================//
    sock.ev.on("messages.upsert", async ({messages, type}) => {
        const msg = messages[0] || messages[messages.length - 1]
        if (type !== "notify") return
        if (!msg?.message) return
        if (msg.key && msg.key.remoteJid == "status@broadcast") {
            if (db.settings?.autoRead) sock.readMessages([msg.key])
            return
        }
        const m = serialize(sock, msg, store)
        if (m?.key?.fromMe && m.isBaileys && m.type == "protocolMessage" && m.sender == m.botNumber) return
        loadDatabase(m)
        Message(sock, m, store) 
    })
    //=================================================//
    sock.ev.on("group-participants.update", async (msg) => {
        //console.log(util.format(msg)) 
    })
    //=================================================//
    sock.ws.on("CB:call", async (msg) => {
        callingMessage(sock, msg)
    })
    //=================================================//
    sock.ev.on("contacts.update", (update) => {
        for(const x of update) {
            const jid = decodeJid(x?.id)
            if (store && store.contacts) store.contacts[jid] = { id: jid, name: x.notify }
            if (Object.keys(db.message).includes(jid) && db.message[jid].name !== x.notify) db.message[jid].name = x.notify
        }
    })
    //=================================================//
    sock.ev.on("creds.update", saveCreds)
    //=================================================//
    setInterval(async () => {
        await fs.writeFileSync("database/db.json", stable({ 
            "allcommand": db.allcommand, 
            "anonymous": db.anonymous, 
            "antispam": db.antispam, 
            "banned": db.banned, 
            "blockcmd": db.blockcmd, 
            "chats": db.chats, 
            "code": db.code, 
            "cooldown": db.cooldown, 
            "dashboard": db.dashboard, 
            "devoloper": db.devoloper, 
            "groups": db.groups, 
            "listerror": db.listerror, 
            "owner": db.owner, 
            "premium": db.premium, 
            "pterodactyl": db.pterodactyl, 
            "users": db.users, 
            "sewa": db.sewa, 
            "vip": db.vip 
        }))
        await fs.writeFileSync("database/store.json", stable(db.message, { "space": "  "}))        
        await fs.writeFileSync("system/config/settings.json", stable(global.db.settings, { "space": "  "}))
    }, 3000)
    //=================================================//
    
    
    return sock
}