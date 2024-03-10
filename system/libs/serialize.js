const fs = require("fs")
const util = require("util") 
const { fromBuffer } = require("file-type")    
const { decodeJid, randomNomor } = require("@libs/function")
const { default: makeWASocket, getContentType, downloadContentFromMessage, generateForwardMessageContent, generateWAMessageFromContent } = require("@adiwajshing/baileys")




exports.makeWASocket = (connectionOptions) => {
    const sock = makeWASocket(connectionOptions)
    sock.copyNForward = async(jid, message, forwardingScore = true, options = {}) => {
        let m = generateForwardMessageContent(message, !!forwardingScore)
        let mtype = Object.keys(m)[0]
        if (forwardingScore && typeof forwardingScore == "number" && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
        m = generateWAMessageFromContent(jid, m, { ...options, userJid: sock?.user?.id })
        await sock.relayMessage(jid, m.message, { messageId: m?.key?.id, additionalAttributes: { ...options } })
        return m
    }
    
    sock.downloadAndSaveMediaMessage = async(msg, filename) => {
        const messageType = ["viewOnceMessageV2","viewOnceMessage","documentWithCaptionMessage"].includes(msg.type)? getContentType(msg.message).split("Message")[0] : msg.type.split("Message")[0]
        const stream = await downloadContentFromMessage(msg.message[messageType + "Message"], messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        const { ext } = await fromBuffer(buffer)
        const paths = util.format(filename).includes(".")? filename : filename + "." + ext
        await fs.writeFileSync(paths, buffer)
        return paths
    }
    
    sock.downloadMediaMessage = async(msg) => {
        const messageType = ["viewOnceMessageV2","viewOnceMessage","documentWithCaptionMessage"].includes(msg.type)? getContentType(msg.message).split("Message")[0] : msg.type.split("Message")[0]
        const stream = await downloadContentFromMessage(msg.message[messageType + "Message"], messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    }

    sock.sendContact = async (jid, number, name, quoted) => {
        let njid = number.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net"
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name.replace(/\n/g, "\\n")}\nTEL;type=CELL;type=VOICE;waid=${number}:${number}\nEND:VCARD`
        return sock.sendMessage(jid, { contacts: { displayName: `${name}`, contacts: [{ vcard }] }}, { quoted })
    }
    
    sock.sendKontak = async (jid, data, quoted) => {
        const vcard = []
        for (let x of data) {
            const name = x == db.settings.ownerNumber + "@s.whatsapp.net"? db.settings.ownerName : Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]          
            vcard.push({vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${name.replace(/\n/g, "\\n")}\nTEL;type=CELL;type=VOICE;waid=${x.split("@")[0]}:${x.split("@")[0]}\nEND:VCARD`}) 
        }
        return sock.sendMessage(jid, { contacts: { displayName: `${vcard.length} Kontak`, contacts: vcard }}, { quoted })
    }
    
    sock.getAllGroups = async (istMe) => {
        const results = []
        const object = await sock.groupFetchAllParticipating()
        for (const x of Object.keys(object)) {
            results.push(object[x]) 
        }
        if (istMe == true) {
            return results.filter(({ participants }) => participants.map((x) => x.id).includes(decodeJid(sock?.user?.id))) 
        } else if (istMe == false) {
            return results.filter(({ participants }) => !participants.map((x) => x.id).includes(decodeJid(sock?.user?.id))) 
        } else {
            return results
        }
    }

    
    return sock
}


exports.serialize = (sock, msg) => {
    const m = {}
    const chats = {}
    const command = {
        "\`\`\`「 MODE ANTI ASING 」\`\`\`": "antiasing", 
        "\`\`\`「 MODE ANTI DELETED 」\`\`\`": "antidel", 
        "\`\`\`「 MODE ANTI LINK GROUP 」\`\`\`": "antilink", 
        "\`\`\`「 MODE ANTI LINK FACEBOOK 」\`\`\`": "antilinkfb", 
        "\`\`\`「 MODE ANTI LINK INSTAGRAM 」\`\`\`": "antilinkig", 
        "\`\`\`「 MODE ANTI LINK TELEGRAM 」\`\`\`": "antilinktele", 
        "\`\`\`「 MODE ANTI LINK TIKTOK 」\`\`\`": "antilinktt", 
        "\`\`\`「 MODE ANTI LINK TWITTER 」\`\`\`": "antilinktwt", 
        "\`\`\`「 MODE ANTI LINK WHATSAPP 」\`\`\`": "antilinkwa", 
        "\`\`\`「 MODE ANTI LINK YOUTUBE 」\`\`\`": "antilinkyt", 
        "\`\`\`「 MODE ANTI NSFW 」\`\`\`": "antinsfw", 
        "\`\`\`「 MODE ANTI SANGE 」\`\`\`": "antisange", 
        "\`\`\`「 MODE ANTI TAGS 」\`\`\`": "antitag", 
        "\`\`\`「 MODE ANTI TOXIC 」\`\`\`": "antitoxic", 
        "\`\`\`「 MODE ANTI VIEW ONCE 」\`\`\`": "antivo", 
        "\`\`\`「 MODE ANTI BUG 」\`\`\`": "antibug", 
        "\`\`\`「 WELCOME GROUP 」\`\`\`": "welcome", 
        "\`\`\`「 GROUP OPEN/CLOSE 」\`\`\`": "group", 
        "\`\`\`「 GROUP SETTINGS 」\`\`\`": "restrict", 
        "\`\`\`「 MODE ANTI CALL 」\`\`\`": "anticall", 
        "\`\`\`「 MODE ANTI SPAM 」\`\`\`": "antispam", 
        "\`\`\`「 MODE AUTO BACKUP 」\`\`\`": "autobackup", 
        "\`\`\`「 MODE AUTO BLOCK COMMAND 」\`\`\`": "autoblockcmd", 
        "\`\`\`「 MODE AUTO JOIN GROUP 」\`\`\`": "autojoin", 
        "\`\`\`「 MODE AUTO LEVEL 」\`\`\`": "autolevel", 
        "\`\`\`「 MODE AUTO READ 」\`\`\`": "autoread", 
        "\`\`\`「 MODE AUTO REPORT 」\`\`\`": "autoreport", 
        "\`\`\`「 SETTINGS MODE BOT 」\`\`\`": "mode", 
        "\`\`\`「 SETTINGS PREFIX BOT 」\`\`\`": "setprefix", 
        "\`\`\`「 SETTINGS REPLY BOT 」\`\`\`": "setreply", 
        "\`\`\`「 SETTINGS ANTI LINK GROUP 」\`\`\`": "setantilink", 
        "\`\`\`「 SETTINGS ANTI LINK YOUTUBE 」\`\`\`": "setantilinkyt", 
        "\`\`\`「 SETTINGS ANTI LINK FACEBOOK 」\`\`\`": "setantilinkfb", 
        "\`\`\`「 SETTINGS ANTI LINK INSTAGRAM 」\`\`\`": "setantilinkig", 
        "\`\`\`「 SETTINGS ANTI LINK TELEGRAM 」\`\`\`": "setantilinktele", 
        "\`\`\`「 SETTINGS ANTI LINK WHATSAPP 」\`\`\`": "setantilinkwa", 
        "\`\`\`「 SETTINGS ANTI LINK TIKTOK 」\`\`\`": "setantilinktt", 
        "\`\`\`「 SETTINGS ANTI LINK TWITTER 」\`\`\`": "setantilinktwt", 
        "\`\`\`「 SETTINGS ANTI BUG 」\`\`\`": "setantibug", 
        "\`\`\`「 SETTINGS ANTI TAGS 」\`\`\`": "setantitag", 
        "\`\`\`「 SETTINGS ANTI SANGE 」\`\`\`": "setantisange", 
        "\`\`\`「 SETTINGS ANTI TOXIC 」\`\`\`": "setantitoxic", 
    }
    if (msg.key) {
        m.key = {
            id: msg?.key?.id || "", 
            fromMe: msg?.key?.fromMe || false, 
            remoteJid: msg?.key?.remoteJid || "", 
            participant: msg?.key?.participant || ""
        }
        m.isBaileys = m?.key?.id.startsWith("BAE5") && m?.key?.id.length == 16
        m.chat = m.key.remoteJid
        m.isGroup = m.chat.endsWith("@g.us")
        m.sender = decodeJid(m?.key?.fromMe && sock?.user?.id || m.key.participant || m.chat || "")
        m.senderNumber = m.sender.split("@")[0]
    }
    m.type = (!["senderKeyDistributionMessage","messageContextInfo"].includes(Object.keys(msg.message)[0]) && Object.keys(msg.message)[0]) || (Object.keys(msg.message).length >= 3 && Object.keys(msg.message)[1] !== "messageContextInfo" && Object.keys(msg.message)[1]) || Object.keys(msg.message)[Object.keys(msg.message).length - 1]
    if (m.type == "extendedTextMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "extendedTextMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "conversation") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "conversation": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "imageMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "imageMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "videoMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "videoMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "stickerMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "stickerMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "audioMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "audioMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "viewOnceMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "viewOnceMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "viewOnceMessageV2") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "viewOnceMessageV2": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "contactMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "contactMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "contactsArrayMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "contactsArrayMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "locationMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "locationMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "documentMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "documentMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    } else if (m.type == "documentWithCaptionMessage") {
        chats[m.sender] = { 
            "name": msg?.pushName || "No name", 
            "msg": {}
        }
        chats[m.sender].msg[m.key.id] = {
            "key": m?.key, 
            "messageTimestamp": msg?.messageTimestamp, 
            "message": { 
                "documentWithCaptionMessage": msg?.message[m.type] 
            }
        }
        if (Object.keys(db.message).includes(m.sender)) db.message[m.sender].msg[m.key.id] = chats[m.sender].msg[m.key.id]
        if (!Object.keys(db.message).includes(m.sender)) db.message[m.sender] = chats[m.sender]
    }
    if (["viewOnceMessage","viewOnceMessageV2","documentWithCaptionMessage"].includes(m.type)) {
        msg.message = msg.message[m.type].message
    }
    m.body = m.type == "conversation"? msg.message.conversation : m.type == "extendedTextMessage"? msg.message.extendedTextMessage.text : m.type == "imageMessage"? msg.message.imageMessage.caption : m.type == "videoMessage"? msg.message.videoMessage.caption : m.type == "viewOnceMessage"? msg.message[getContentType(msg.message)]?.caption : m.type == "viewOnceMessageV2"? msg.message[getContentType(msg.message)]?.caption : m.type == "documentMessage"? msg.message.documentMessage?.caption : m.type == "documentWithCaptionMessage"? msg.message.documentMessage.caption : m.type == "pollCreationMessage"? msg.message.pollCreationMessage.name : ""
    m.budy = m.type == "conversation"? msg.message.conversation : m.type == "extendedTextMessage"? msg.message.extendedTextMessage.text : ""
    m.args = m.body.trim().split(/ +/).slice(1)
    m.text = m?.args?.join(" ")
    m.botNumber = decodeJid(sock?.user?.id)
    m.pushName = msg.pushName || "No name"
    m.mentionedJid = msg.message[m.type]?.contextInfo?.mentionedJid?.length > 0? msg.message[m.type].contextInfo.mentionedJid : []
    m.isMention = m.mentionedJid.length > 0
    m.isNumber = (x) => typeof x === "number" && !isNaN(x)
    m.isBlock = async (x) => (await sock.fetchBlocklist()).includes(x)
    m.isCreator = [db.devoloper + "@s.whatsapp.net", db.settings.ownerNumber + "@s.whatsapp.net", ...Object.keys(db.vip)].includes(m.sender)
    m.isOwner = m.isCreator? true : Object.keys(db.owner).includes(m.sender)
    m.isPremium = m.isOwner? true : db.settings.vipSewa.includes(m.chat)? true : Object.keys(db.premium).includes(m.sender)
    m.isSewa = m.isPremium? true : m.key.fromMe? true : Object.keys(db.sewa).includes(m.chat)? true : Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].sewa.status : false
    m.messageTimestamp = msg.messageTimestamp
    m.message = msg.message
    m.quoted = msg.message[m.type]?.contextInfo?.quotedMessage? {} : false
    if (m.quoted) {
        m.quoted.key = {
            id: msg.message[m.type].contextInfo?.stanzaId || "",
            fromMe: msg.message[m.type].contextInfo?.participant == m.botNumber,
            remoteJid: decodeJid(m.message[m.type].contextInfo?.remoteJid || m.chat || m.sender),
            participant: decodeJid(msg.message[m.type].contextInfo?.participant)
        }
        m.quoted.isBaileys = m.quoted?.key?.id.startsWith("BAE5") && m.quoted?.key?.id.length == 16
        m.quoted.chat = m.quoted.key.remoteJid
        m.quoted.isGroup = m.quoted.chat.endsWith("@g.us")
        m.quoted.sender = m.quoted.key.participant
        m.quoted.senderNumber = m.quoted.key.participant.split("@")[0]
        m.quoted.type = Object.keys(msg.message[m.type].contextInfo.quotedMessage)[0]
        if (["viewOnceMessage","viewOnceMessageV2","documentWithCaptionMessage"].includes(m.quoted.type)) {
            msg.message[m.type].contextInfo.quotedMessage = msg.message[m.type].contextInfo.quotedMessage[m.quoted.type].message
        }
        m.quoted.body = m.quoted.type == "conversation"? msg.message[m.type].contextInfo.quotedMessage.conversation : m.quoted.type == "extendedTextMessage"? msg.message[m.type].contextInfo.quotedMessage.extendedTextMessage.text : m.quoted.type == "imageMessage"? msg.message[m.type].contextInfo.quotedMessage.imageMessage.caption : m.quoted.type == "videoMessage"? msg.message[m.type].contextInfo.quotedMessage.videoMessage.caption : m.quoted.type == "viewOnceMessage"? msg.message[m.type].contextInfo.quotedMessage[getContentType(msg.message[m.type].contextInfo.quotedMessage)]?.caption : m.quoted.type == "viewOnceMessageV2"? msg.message[m.type].contextInfo.quotedMessage[getContentType(msg.message[m.type].contextInfo.quotedMessage)]?.caption : m.quoted.type == "documentMessage"? msg.message[m.type].contextInfo.quotedMessage.documentMessage?.caption : m.quoted.type == "documentWithCaptionMessage"? msg.message[m.type].contextInfo.quotedMessage.documentMessage.caption : m.quoted.type == "pollCreationMessage"? msg.message[m.type].contextInfo.quotedMessage.pollCreationMessage.name : ""
        m.quoted.budy = m.quoted.type == "conversation"? msg.message[m.type].contextInfo.quotedMessage.conversation : m.quoted.type == "extendedTextMessage"? msg.message[m.type].contextInfo.quotedMessage.extendedTextMessage.text : ""
        m.quoted.args = m.quoted.body.trim().split(/ +/).slice(1)
        m.quoted.text = m?.quoted?.args?.join(" ")
        m.quoted.pushName = Object.keys(db.users).includes(m.quoted.sender)? db.users[m.quoted.sender].name : "No Name"
        m.quoted.mentionedJid = msg.message[m.type]?.contextInfo?.quotedMessage?.contextInfo?.mentionedJid?.length > 0? msg.message[m.type].contextInfo.quotedMessage.contextInfo.mentionedJid : []
        m.quoted.isMention = m.quoted.mentionedJid.length > 0
        m.quoted.isCreator =  [db.devoloper + "@s.whatsapp.net", db.settings.ownerNumber + "@s.whatsapp.net", ...Object.keys(db.vip)].includes(m.quoted.sender)
        m.quoted.isOwner = m.quoted.isCreator? true : Object.keys(db.owner).includes(m.quoted.sender)
        m.quoted.isPremium = m.quoted.isOwner? true : db.settings.vipSewa.includes(m.chat)? true : Object.keys(db.premium).includes(m.quoted.sender)
        m.quoted.isSewa = m.quoted.isPremium? true : m.key.fromMe? true : Object.keys(db.sewa).includes(m.chat)? true : Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].sewa.status : false
        m.quoted.message = msg.message[m.type].contextInfo.quotedMessage
        if (m.quoted.isBaileys && m.quoted.key.fromMe && Object.keys(command).filter((x) => m.quoted.body.startsWith(x)).length > 0) {
            m.body = db.settings?.setPrefix == "no"? (command[Object.keys(command).find((x) => m.quoted.body.startsWith(x))] + " " + m.body.toLowerCase()) : ("." + command[Object.keys(command).find((x) => m.quoted.body.startsWith(x))] + " " + m.body.toLowerCase()) 
            m.args = m.body.trim().split(/ +/).slice(1)
            m.text = m?.args?.join(" ")
        }
    } 
    m.input = m.isMention && m.quoted && m.mentionedJid.includes(m.quoted.sender)? m.mentionedJid : m.isMention && m.quoted? [...m.mentionedJid, m.quoted.sender] : m.isMention? m.mentionedJid : m.quoted? Array(m.quoted.sender) : m.text != "" && !isNaN(parseFloat(m.text.replace(new RegExp("[()+-/ +/]", "gi"), "")))? Array(parseFloat(m.text.replace(new RegExp("[()+-/ +/]", "gi"), "")) + "@s.whatsapp.net") : []
    m.reply = async (teks, chatId = m.chat, type = db.settings.replyType, mention = [], options = { quoted: m }) => {
        if (type == "mess1") {
            return sock.sendMessage(chatId, { text: teks, mentions: (Array.isArray(mention) && mention.length > 0)? mention.map((x) => (x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net")) : [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x + "@s.whatsapp.net") }, options)
        } else if (type == "mess2") {
            return sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: (Array.isArray(mention) && mention.length > 0)? mention.map((x) => (x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net")) : [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x + "@s.whatsapp.net"), forwardingScore: 10, isForwarded: true }}, options)
        } else if (type == "mess3") {
            return sock.sendMessage(chatId, { text: teks, contextInfo: { mentionedJid: (Array.isArray(mention) && mention.length > 0)? mention.map((x) => (x.endsWith("@s.whatsapp.net")? x : x + "@s.whatsapp.net")) : [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map((x) => x[1]).filter((x) => !isNaN(parseInt(x))).map((x) => x + "@s.whatsapp.net"), forwardingScore: 999, isForwarded: true }}, options)
        }
    }

    return m
}