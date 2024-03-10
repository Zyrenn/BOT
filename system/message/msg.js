const {
    sleep, 
    randomNomor, 
    pickRandom, 
    isUrl, 
    toFirstCase, 
    randomCode, 
    decodeJid, 
    isFiles, 
    isBase64, 
    resizeImage, 
    calender, 
    week, 
    time, 
    fetchJson, 
    fetchBuffer, 
    fetchBase64, 
    formatSize, 
    runtime, 
    timeToEpired, 
    question, 
    getMessage, 
    generateProfilePicture, 
    checkCommand, 
} = require("@libs/function")
const fs = require("fs") 
const util = require("util") 
const i18n = require("i18n") 
const path = require("path") 
const chalk = require("chalk") 
const moment = require("moment-timezone") 
const similarity = require("string-similarity")
const { exec } = require("child_process") 
const { commands } = require("@libs/collection")
const { default: axios } = require("axios")
const { getContentType } = require("@adiwajshing/baileys")
const { imageToWebp, videoToWebp, writeExif, editBackground, imageToUrl, uploadFileApi } = require("@libs/localConverter")




exports.Message = async(sock, m, store) => {
    try{
        const isText = ["extendedTextMessage","conversation"].includes(m.type)
        const isImage = ["imageMessage"].includes(m.type)
        const isVideo = ["videoMessage"].includes(m.type)
        const isSticker = ["stickerMessage"].includes(m.type)
        const isAudio = ["audioMessage"].includes(m.type) && !(m.message[m.type]?.ptt) 
        const isVoice = ["audioMessage"].includes(m.type) && !!(m.message[m.type]?.ptt) 
        const isViewOnce = ["viewOnceMessageV2","viewOnceMessage"].includes(m.type)
        const isContact = ["contactMessage","contactsArrayMessage"].includes(m.type)
        const isLocation = ["locationMessage"].includes(m.type)
        const isDocument = ["documentMessage","documentWithCaptionMessage"].includes(m.type)
        const isProtocol = ["protocolMessage"].includes(m.type)
        const isPollUpdate = ["pollUpdateMessage"].includes(m.type)
        const isPollCreation = ["pollCreationMessage"].includes(m.type)
        const isAllMedia = ["imageMessage","videoMessage","stickerMessage","audioMessage","viewOnceMessageV2","viewOnceMessage","contactMessage","contactsArrayMessage","locationMessage","documentMessage","documentWithCaptionMessage"].includes(m.type)
        const isQuotedText = m.quoted? ["extendedTextMessage","conversation"].includes(m.quoted.type) : false
        const isQuotedImage = m.quoted? ["imageMessage"].includes(m.quoted.type) : false
        const isQuotedVideo = m.quoted? ["videoMessage"].includes(m.quoted.type) : false
        const isQuotedSticker = m.quoted? ["stickerMessage"].includes(m.quoted.type) : false
        const isQuotedAudio = m.quoted? (["audioMessage"].includes(m.quoted.type) && !(m.quoted.message[m.quoted.type]?.ptt)) : false
        const isQuotedVoice = m.quoted? (["audioMessage"].includes(m.quoted.type) && !!(m.quoted.message[m.quoted.type]?.ptt)) : false
        const isQuotedViewOnce = m.quoted? ["viewOnceMessageV2","viewOnceMessage"].includes(m.quoted.type) : false
        const isQuotedContact = m.quoted? ["contactMessage","contactsArrayMessage"].includes(m.quoted.type) : false
        const isQuotedLocation = m.quoted? ["locationMessage"].includes(m.quoted.type) : false
        const isQuotedDocument = m.quoted? ["documentMessage","documentWithCaptionMessage"].includes(m.quoted.type) : false
        const isQuotedAllMedia = m.quoted? ["imageMessage","videoMessage","stickerMessage","audioMessage","viewOnceMessageV2","viewOnceMessage","contactMessage","contactsArrayMessage","locationMessage","documentMessage","documentWithCaptionMessage"].includes(m.quoted.type) : false
        //=================================================//
        const groupMetadata = m.isGroup? await sock.groupMetadata(m.chat).catch(e => {}) : {}
        const groupName = Object.keys(groupMetadata).length > 0? groupMetadata.subject : ""
        const participants = Object.keys(groupMetadata).length > 0? groupMetadata.participants : ""
        const groupMembers = Object.keys(groupMetadata).length > 0? groupMetadata.participants.map((x) => x.id) : ""
        const groupAdmins = Object.keys(groupMetadata).length > 0? participants.filter((x) => x.admin !== null).map((x) => x.id) : ""
        const groupOwner = Object.keys(groupMetadata).length > 0? groupMetadata.owner : ""
        const isBotGroupAdmins = Object.keys(groupMetadata).length > 0? groupAdmins.includes(m.botNumber) : false
        const isGroupAdmins = Object.keys(groupMetadata).length > 0? groupAdmins.includes(m.sender) : false
        const isAntiLink = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link.status : false
        const isAntiLinkYoutube = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_youtube.status : false
        const isAntiLinkFacebook = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_facebook.status : false
        const isAntiLinkInstagram = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_instagram.status : false
        const isAntiLinkTwitter = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_twitter.status : false
        const isAntiLinkTelegram = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_telegram.status : false
        const isAntiLinkWhatsapp = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_whatsapp.status : false
        const isAntiLinkTiktok = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_link_tiktok.status : false
        const isAntiVirtex = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_virtex.status : false
        const isAntiTags = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_tag.status : false
        const isAntiToxic = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_toxic.status : false
        const isAntiSange = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_sange.status : false
        const isAntiAsing = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_asing : false
        const isAntiDelete = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_delete : false
        const isAntiViewOnce = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].anti_view_once : false
        const isMuteChats = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].mute : false
        const localAfkGroup = Object.keys(db.groups).includes(m.chat)? db.groups[m.chat].afk_group : []
        //=================================================//
        if (db.settings?.setPrefix == "multi") {
            var thePrefix = "MULTI-PREFIX"
            var prefix = m.body.startsWith("#")? "#" : m.body.startsWith("!")? "!" : m.body.startsWith("/")? "/" : m.body.startsWith("?")? "?" : "."
            var isCmd = m.body.startsWith(prefix)
            var command = isCmd? m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : ""
            var cmdOptions = commands.get(command) || {}
        } else if (db.settings?.setPrefix == "no") {
            var thePrefix = "NO-PREFIX"
            var prefix = ""
            var isCmd = m.body.startsWith(prefix)
            var command = m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
            var cmdOptions = commands.get(command) || {}
        } else if (db.settings?.setPrefix == "all") {
            var thePrefix = "ALL-PREFIX"
            var prefix = m.body.startsWith("#")? "#" : m.body.startsWith("!")? "!" : m.body.startsWith("/")? "/" : m.body.startsWith("?")? "?" : "."
            var isCmd = m.body.startsWith(prefix)
            var command = m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
            var cmdOptions = commands.get(command) || {}
        } else {
            var thePrefix = "MULTI-PREFIX"
            var prefix = m.body.startsWith("#")? "#" : m.body.startsWith("!")? "!" : m.body.startsWith("/")? "/" : m.body.startsWith("?")? "?" : "."
            var isCmd = m.body.startsWith(prefix)
            var command = isCmd? m.body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : ""
            var cmdOptions = commands.get(command) || {}
        }
        //=================================================//
        if (db.settings?.autoRead) sock.readMessages([m.key])
        //=================================================//
        const command_log = [chalk.whiteBright("├"), chalk.keyword("aqua")(`[ ${m.isGroup? "GROUP" : "PRIVATE"} ]`), chalk.whiteBright(m.body == "" && isImage? "image" : m.body == "" && isVideo? "video" : m.body == "" && isViewOnce? "view once" : m.body == "" && isDocument? "document" : isSticker? "sticker" : isAudio? "audio" : isVoice? "voice" : isContact? "contact" : isLocation? "location" : isProtocol? "delete message" : isPollUpdate? "update poll" : isPollCreation? "creation poll" : m.body), chalk.greenBright("from"), chalk.yellow(m.pushName)]
        if (m.isGroup) {
            command_log.push(chalk.greenBright("in"))
            command_log.push(chalk.yellow(groupName))
        }
        if (isImage || isVideo || isViewOnce || isDocument || isSticker || isAudio || isVoice || isContact || isLocation || isProtocol || isPollUpdate || isPollCreation || isText) console.log(...command_log)
        //=================================================//
        if (db.settings?.autoJoin && m.body.includes("chat.whatsapp.com/") && m.body.split(".com/")[1] !== "") {
            sock.groupAcceptInvite(m.body.split(".com/")[1].split(" ").filter((x) => x !== "")[0]).catch(() => console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), "Invalid link group")) 
        }
        //=================================================//
        if (Object.keys(groupMetadata).length > 0 && groupMembers.includes(m.botNumber) && groupMetadata?.announce && !isBotGroupAdmins) return
        //=================================================//
        if (isUrl(m.body) && m.type == "extendedTextMessage" && !Object.keys(db.linkpreview).includes(m.key.id)) {
            db.linkpreview[m.key.id] = {
                "messageTimestamp": m.messageTimestamp, 
                "message": m.message
            }
        } else if (Object.keys(db.linkpreview).includes(m.key.id)) return
        //=================================================//
        if (m.isGroup && isText && Object.keys(db.code).filter((x) => x.includes(m.budy)).length > 0) {
            if (Object.keys(db.sewa).includes(m.chat) && db.sewa[m.chat].expired !== "PERMANEN" && !db.settings.vipSewa.includes(m.chat) || !Object.keys(db.sewa).includes(m.chat) && !db.settings.vipSewa.includes(m.chat)) {
                const data = Object.keys(db.code).filter((x) => x.includes(m.budy))
                const expired = (!isNaN(parseFloat(db.code[data[0]].expired)) && (db.code[data[0]].expired.toLowerCase().includes("second") || db.code[data[0]].expired.toLowerCase().includes("detik")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}second`)) : (!isNaN(parseFloat(db.code[data[0]].expired)) && (db.code[data[0]].expired.toLowerCase().includes("minute") || db.code[data[0]].expired.toLowerCase().includes("menit")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}minute`)) : (!isNaN(parseFloat(db.code[data[0]].expired)) && (db.code[data[0]].expired.toLowerCase().includes("hour") || db.code[data[0]].expired.toLowerCase().includes("jam")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}hour`)) : (!isNaN(parseFloat(db.code[data[0]].expired)) && (db.code[data[0]].expired.toLowerCase().includes("day") || db.code[data[0]].expired.toLowerCase().includes("hari")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}day`)) : (!isNaN(parseFloat(db.code[data[0]].expired)) && (db.code[data[0]].expired.toLowerCase().includes("week") || db.code[data[0]].expired.toLowerCase().includes("minggu")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}week`)) : (!isNaN(parseFloat(db.code[data[0]].expired)) && (db.code[data[0]].expired.toLowerCase().includes("month") || db.code[data[0]].expired.toLowerCase().includes("bulan")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}month`)) : (!isNaN(parseFloat(db.code[data[0]].expired)) && (db.code[data[0]].expired.toLowerCase().includes("year") || db.code[data[0]].expired.toLowerCase().includes("tahun")))? (Date.now() + time(`${parseFloat(db.code[data[0]].expired)}year`)) : "PERMANEN"
                if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].sewa.status) db.groups[m.chat].sewa.status = false
                if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].sewa.expired) db.groups[m.chat].sewa.expired = 0 
                if (Object.keys(db.sewa).includes(m.chat) && !isNaN(expired)) db.sewa[m.chat].expired += expired
                if (Object.keys(db.sewa).includes(m.chat) && expired == "PERMANEN") db.sewa[m.chat].expired = expired
                if (!Object.keys(db.sewa).includes(m.chat)) db.sewa[m.chat] = { "date": calender(), "expired": expired }
                m.reply(`Success add sewa${!isNaN(expired)? (" " + db.code[data[0]].expired) : ""}${groupName? (" to " + groupName) : ""}`)
                setTimeout(() => {
                    delete db.code[data[0]]
                }, 3000)
            }
        }
        //=================================================//
        if (Object.keys(db.owner).length > 0) {
            for(const x of Object.keys(db.owner)) {
                if (!isNaN(db.owner[x].expired) && Date.now() >= db.owner[x].expired) {
                    delete db.owner[x]
                    if ((await sock.onWhatsApp(x)).length > 0 && !(await m.isBlock(x))) m.reply("Waktu menjadi owner kamu telah habis", x, db.settings.replyType, [], {})
                }
            }
        }
        //=================================================//
        if (Object.keys(db.premium).length > 0) {
            for(const x of Object.keys(db.premium)) {
                if (!isNaN(db.premium[x].expired) && Date.now() >= db.premium[x].expired) {
                    delete db.premium[x]
                    if ((await sock.onWhatsApp(x)).length > 0 && !(await m.isBlock(x))) m.reply("Waktu menjadi owner kamu telah habis", x, db.settings.replyType, [], {})
                }
            }
        }
        //=================================================//
        if (Object.keys(db.groups).includes(m.chat) && db.groups[m.chat].sewa.status) {
            if (Object.keys(db.sewa).includes(m.chat)) {
                db.groups[m.chat].sewa.status = false
                db.groups[m.chat].sewa.expired = 0
            } else if (!isNaN(db.groups[m.chat].sewa.expired) && Date.now() >= db.groups[m.chat].sewa.expired) {
                db.groups[m.chat].sewa.status = false
                db.groups[m.chat].sewa.expired = 0
                m.reply("Waktu sewa group ini telah habis", m.chat, db.settings.replyType, groupAdmins, {})
            }
        } else if (Object.keys(db.sewa).length > 0) {
            for(const x of Object.keys(db.sewa)) {
                if (!isNaN(db.sewa[x].expired) && Date.now() >= db.sewa[x].expired) {
                    const listGroup = Object.keys(await sock.groupFetchAllParticipating())
                    const listRespon = listGroup.filter(async (x) => {
                        const metadata = await sock.groupMetadata(x).catch(e => {})
                        return (Object.keys(metadata).length > 0 && metadata.participants.map((x) => x.id).includes(m.botNumber) && metadata.announce && !metadata.participants.filter((x) => x.admin !== null).map((x) => x.id).includes(m.botNumber) || Object.keys(metadata).length > 0 && metadata.participants.map((x) => x.id).includes(m.botNumber) && !metadata.announce) 
                    }) 
                    const listNoRespon = listGroup.filter((x) => !listRespon.includes(x)) 
                    const metadata = await sock.groupMetadata(x).catch(e => {})
                    delete db.sewa[x]
                    if (listRespon.includes(x)) m.reply("Waktu sewa group ini telah habis", x, db.settings.replyType, Object.keys(metadata).length > 0? metadata.participants.filter((x) => x.admin !== null).map((x) => x.id) : [], {})
                    if (listNoRespon.includes(x)) {
                        const admin = Object.keys(metadata).length > 0? metadata.participants.filter((x) => x.admin !== null).map((x) => x.id) : []
                        for(const o of admin) {
                            m.reply("Waktu sewa group kamu telah habis", o, db.settings.replyType, [], {})
                        }
                    }
                }
            }
        }
        //=================================================//
        if (Object.keys(db.groups).includes(m.chat) && Object.keys(db.groups[m.chat].store.key).length > 0) {
            for(const x of Object.keys(db.groups[m.chat].store.key).filter((x) => (db.groups[m.chat].store.key[x].time !== 0))) {
                if (Date.now() >= Number(db.groups[m.chat].store.key[x].time)) {
                    db.groups[m.chat].store.key[x].time = 0
                    m.reply("Expired is key " + x, m.chat, db.settings.replyType, groupMembers, {}) 
                }
            }
        }
        //=================================================//
        if (db.settings?.mode == "self") {
            if (!m.isOwner && !m.key.fromMe) return
        } else if (db.settings?.mode == "group") {
            if (!m.isGroup && !m.isOwner && !m.key.fromMe) return
        } else if (db.settings?.mode == "private") {
            if (m.isGroup && !m.isSewa) return
        }
        //=================================================//
        if (isMuteChats) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) return
        }
        //=================================================//
        const cmdSuccess = async(cmd, tags = "", type = "") => {
            if (Object.keys(db.listerror).includes(cmd)) delete db.listerror[cmd]
            if (!Object.keys(db.allcommand).includes(cmd) && type == "case") {
                db.allcommand[cmd] = { type: "case", tags_menu: tags }
            }
            if (Object.keys(db.allcommand).includes(cmd) && tags !== "" && tags !== db.allcommand[cmd].tags_menu) {
                db.allcommand[cmd].tags_menu = tags
            }
            if (Object.keys(db.allcommand).includes(cmd) && type == "" && type !== db.allcommand[cmd].type) {
                db.allcommand[cmd].type = "file"
            } else if (Object.keys(db.allcommand).includes(cmd) && type == "case" && type !== db.allcommand[cmd].type) {
                db.allcommand[cmd].type = "case"
            }
            if (Object.keys(db.dashboard).includes(calender()) && Object.keys(db.dashboard[calender()]).includes("commands") && !Object.keys(db.dashboard[calender()].commands).includes(cmd)) {
                db.dashboard[calender()].commands[cmd] = { succes: 1, failed: 0 }
            } else if (Object.keys(db.dashboard).includes(calender()) && Object.keys(db.dashboard[calender()]).includes("commands") && Object.keys(db.dashboard[calender()].commands).includes(cmd)) {
                db.dashboard[calender()].commands[cmd].succes += 1
            }
            if (!m.key.fromMe && !(m.isOwner || Object.keys(db.premium).includes(m.sender)) && db.settings.autoLevel) {
                db.users[m.sender].xp += 1
            }
        }
        //================================================================\\
        const cmdFailed = async(cmd, tags = "", errors, type = "") => {
            if (!Object.keys(db.listerror).includes(cmd)) db.listerror[cmd] = { error: util.format(errors) }
            if (Object.keys(db.listerror).includes(cmd) && db.listerror[cmd].error !== util.format(errors)) db.listerror[cmd].error = util.format(errors)
            if (!Object.keys(db.allcommand).includes(cmd) && type == "case") {
                db.allcommand[cmd] = { type: "case", tags_menu: tags }
            }
            if (Object.keys(db.allcommand).includes(cmd) && tags !== "" && tags !== db.allcommand[cmd].tags_menu) {
                db.allcommand[cmd].tags_menu = tags
            }
            if (Object.keys(db.allcommand).includes(cmd) && type == "" && type !== db.allcommand[cmd].type) {
                db.allcommand[cmd].type = "file"
            } else if (Object.keys(db.allcommand).includes(cmd) && type == "case" && type !== db.allcommand[cmd].type) {
                db.allcommand[cmd].type = "case"
            }
            if (Object.keys(db.dashboard).includes(calender()) && Object.keys(db.dashboard[calender()]).includes("commands") && !Object.keys(db.dashboard[calender()].commands).includes(cmd)) {
                db.dashboard[calender()].commands[cmd] = { succes: 0, failed: 1 }
            } else if (Object.keys(db.dashboard).includes(calender()) && Object.keys(db.dashboard[calender()]).includes("commands") && Object.keys(db.dashboard[calender()].commands).includes(cmd)) {
                db.dashboard[calender()].commands[cmd].failed += 1
            }
            if (db.settings.autoBlockCmd && !db.blockcmd.includes(cmd)) { 
                db.blockcmd.push(cmd) 
            }
            m.reply("\`\`\`「  SYSTEM ERROR  」\`\`\`\n\n" + util.format(errors))
            if (db.settings.autoReport) {
                let teks = ""
                teks += "\`\`\`「  SYSTEM ERROR  」\`\`\`\n\n"
                teks += `📳 Nomer : @${m.senderNumber}\n`
                teks += `🔖 Command : ${prefix + cmd}\n`
                teks += `📝 Example : ${m.body}\n`
                teks += `📅 Date : ${calender()}\n`
                teks += `⌚ Time : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}\n`
                teks += `💬 Chatting : ${m.isGroup? "Group chats" : "Private chats"}\n`
                teks += `📢 Info Laporan : ${util.format(errors)}`
                if (m.senderNumber !== db.devoloper) m.reply(teks, db.devoloper + "@s.whatsapp.net")
            }
        }
        //=================================================//
        if (!m.isBaileys && db.settings?.antiSpam && Object.keys(db.antispam).includes(m.sender) && !(m.isOwner || Object.keys(db.premium).includes(m.sender) || m.key.fromMe) && !m.isGroup && (isText || isImage || isVideo || isSticker || isAudio || isVoice || isViewOnce || isContact || isLocation || isDocument || isPollCreation)) {
            if (db.antispam[m.sender].hit < 5) {
                if (db.antispam[m.sender].type == (isText? "text" : isImage? "image" : isVideo? "video" : isSticker? "sticker" : isVoice? "voice" : isAudio? "audio" : isViewOnce? "view once" : isContact? "contact" : isLocation? "location" : isDocument? "document" : isPollCreation? "creation poll" : "")) {
                    db.antispam[m.sender].hit += 1
                    return m.reply("Jangan spam 😡")
                } else {
                    db.antispam[m.sender].hit = 1
                    db.antispam[m.sender].type = isText? "text" : isImage? "image" : isVideo? "video" : isSticker? "sticker" : isVoice? "voice" : isAudio? "audio" : isViewOnce? "view once" : isContact? "contact" : isLocation? "location" : isDocument? "document" : isPollCreation? "creation poll" : ""
                    db.antispam[m.sender].expired = Date.now() + time("15second")
                }
            } else {
                db.banned[m.sender] = {
                    "date": calender(),
                    "reason": "Spam Bot"
                }
                setTimeout(() => {
                    sock.updateBlockStatus(m.sender, "block")
                }, 3000) 
                return m.reply("Maaf kamu telah terbanned karna melakukan spam")
            }
        } else if (!m.isBaileys && db.settings?.antiSpam && !Object.keys(db.antispam).includes(m.sender) && !(m.isOwner || Object.keys(db.premium).includes(m.sender) || m.key.fromMe) && !m.isGroup && (isText || isImage || isVideo || isSticker || isAudio || isVoice || isViewOnce || isContact || isLocation || isDocument || isPollCreation)) {
            db.antispam[m.sender] = {
                "hit": 1, 
                "type": isText? "text" : isImage? "image" : isVideo? "video" : isSticker? "sticker" : isVoice? "voice" : isAudio? "audio" : isViewOnce? "view once" : isContact? "contact" : isLocation? "location" : isDocument? "document" : isPollCreation? "creation poll" : "", 
                "expired": Date.now() + time("15second")
            }
        }
        //=================================================//
        if (!m.isBaileys && m.isSewa && isAntiViewOnce && isViewOnce && command !== "rvo") {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                let media = await sock.downloadMediaMessage(m)
                let teks = "\`\`\`「  VIEW ONCE DETECTED  」\`\`\`\n\n"
                teks += `› Dari : @${m.senderNumber}\n`
                teks += `› Waktu : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}\n`
                teks += `› Tanggal : ${calender()}\n`
                teks += `› Type : ${getContentType(m.message) == "imageMessage"? "image" : "video"}\n`
                teks += `› Caption : ${m.body}`
                if (getContentType(m.message) == "videoMessage") sock.sendMessage(m.chat, { video: media, caption: teks, mimetype: "video/mp4" }, { quoted: m })
                if (getContentType(m.message) == "imageMessage") sock.sendMessage(m.chat, { image: media, caption: teks }, { quoted: m })
            }
        }
        //=================================================//
        if (!m.isBaileys && m.isSewa && isAntiDelete && Object.keys(db.message).includes(m.sender) && isProtocol) {
            if (Object.keys(db.message[m.sender].msg).includes(m.message[m.type].key.id)) {
                if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                    let message = db.message[m.sender].msg[m.message[m.type].key.id].message
                    let type = (!["senderKeyDistributionMessage","messageContextInfo"].includes(Object.keys(message)[0]) && Object.keys(message)[0]) || (Object.keys(message).length >= 3 && Object.keys(message)[1] !== "messageContextInfo" && Object.keys(message)[1]) || Object.keys(message)[Object.keys(message).length - 1]
                    let teks = "\`\`\`「  DELETE MESSAGE DETECTED  」\`\`\`\n\n"
                    teks += `› Dari : @${m.senderNumber}\n`
                    teks += `› Waktu : ${moment().tz("Asia/Jakarta").format("HH:mm:ss")}\n`
                    teks += `› Tanggal : ${calender()}\n`
                    teks += `› Type : ${type}`
                    m.reply(teks)
                    setTimeout(() => {
                        sock.copyNForward(m.chat, db.message[m.sender].msg[m.message[m.type].key.id])
                    }, 2000)
                }
            }
        }
        //=================================================//
        if (m.isSewa && !m.sender.startsWith("62") && isAntiAsing && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  NOMER ASING DETECTED  」\`\`\`")
                setTimeout(() => {
                    sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                }, 2000)
            }
        }
        //=================================================//
        if (m.isSewa && isAntiVirtex && m.body.length > 20000 && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  VIRTEX DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_virtex.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_virtex.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_virtex.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //=================================================//
        if (!m.isBaileys && m.isSewa && isAntiToxic && i18n.__("kata_toxic").filter((x) => x.includes(m.budy.toLowerCase())).length > 0 && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  TOXIC DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_toxic.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_toxic.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_toxic.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiSange && i18n.__("kata_dosa").filter((x) => x.includes(m.budy.toLowerCase())).length > 0 && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  SANGE DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_sange.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_sange.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_sange.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiTags && m.isMention && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  TAGS MEMBER DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_tag.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_tag.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_tag.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiLink && m.body.includes("chat.whatsapp.com/") && m.body.split("chat.whatsapp.com/")[1] !== "" && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                const code = await sock.groupInviteCode(m.chat)
                if (m.body.includes(code)) return
                m.reply("\`\`\`「  LINK GROUP DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_link.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiLinkYoutube && (m.body.includes("youtube.com/") || m.body.includes("https://youtu.be/")) && (m.body.split("youtube.com/")[1] !== "" || m.body.split("https://youtu.be/")[1] !== "") && command !== "yt" && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  LINK YOUTUBE DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_link_youtube.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_youtube.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_youtube.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiLinkFacebook && (m.body.includes("facebook.com/") || m.body.includes("https://fb.watch/")) && (m.body.split("facebook.com/")[1] !== "" || m.body.split("https://fb.watch/")[1] !== "") && command !== "fb" && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  LINK FACEBOOK DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_link_facebook.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_facebook.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_facebook.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiLinkInstagram && m.body.includes("instagram.com/") && m.body.split("instagram.com/")[1] !== "" && command !== "ig" && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  LINK INSTAGRAM DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_link_instagram.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_instagram.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_instagram.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiLinkTwitter && m.body.includes("twitter.com/") && m.body.split("twitter.com/")[1] !== "" && command !== "twitter" && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  LINK TWITTER DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_link_twitter.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_twitter.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_twitter.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiLinkTelegram && m.body.includes("https://t.me/") && m.body.split("https://t.me/")[1] !== "" && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  LINK TELEGRAM DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_link_telegram.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_telegram.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_telegram.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiLinkWhatsapp && (m.body.includes("wa.me/") || m.body.includes("Wa.me/")) && (m.body.split("wa.me/")[1] !== "" || m.body.split("Wa.me/")[1] !== "") && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  LINK WHATSAPP DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_link_whatsapp.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_whatsapp.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_whatsapp.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && isAntiLinkTiktok && m.body.includes("tiktok.com/") && m.body.split("tiktok.com/")[1] !== "" && command !== "tiktok" && isBotGroupAdmins) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("\`\`\`「  LINK TIKTOK DETECTED  」\`\`\`")
                if (db.groups[m.chat].anti_link_tiktok.type == "delete") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_tiktok.type == "kick") {
                    setTimeout(() => {
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                } else if (db.groups[m.chat].anti_link_tiktok.type == "all") {
                    setTimeout(() => {
                        sock.sendMessage(m.chat, { delete: m.key })
                        sock.groupParticipantsUpdate(m.chat, [m.sender], "remove")
                    }, 2000) 
                }
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && Object.keys(db.groups).includes(m.chat) && isText) {
            const data = Object.keys(db.groups[m.chat].store.key).filter((x) => (x.toLowerCase() == m.budy.toLowerCase() || !isNaN(m.budy) && Object.keys(db.groups[m.chat].store.key)[Number(m.budy) - 1] == x))
            if (data.length == 1 && db.groups[m.chat].store.key[data[0]].image !== "" && db.groups[m.chat].store.key[data[0]].text !== "") {
                const { status, buffer } = await fetchBuffer(db.groups[m.chat].store.key[data[0]].image)
                if (status) sock.sendMessage(m.chat, { image: buffer, caption: db.groups[m.chat].store.key[data[0]].text }, { quoted: m }) 
            } else if (data.length == 1 && db.groups[m.chat].store.key[data[0]].document.url !== "" && db.groups[m.chat].store.key[data[0]].text !== "") {
                const { status, buffer } = await fetchBuffer(db.groups[m.chat].store.key[data[0]].document.url)
                if (status) sock.sendMessage(m.chat, { document: buffer, caption: db.groups[m.chat].store.key[data[0]].text, mimetype: "application/bin", fileName: db.groups[m.chat].store.key[data[0]].document.fileName }, { quoted: m }) 
            } else if (data.length == 1 && db.groups[m.chat].store.key[data[0]].text !== "") {
                m.reply(db.groups[m.chat].store.key[data[0]].text) 
            }
        }
        //================================================================\\
        if (!m.isBaileys && m.isSewa && localAfkGroup.length > 0 && !isAntiTags && (m.quoted || m.isMention) && localAfkGroup.filter((x) => [m.quoted.sender, ...m.mentionedJid].includes(x)).length) {
            if (!m.isOwner && !m.key.fromMe && !isGroupAdmins) {
                m.reply("JANGAN GANGGU KAK DIA SEDANG AFK!!") 
            }
        }
        //================================================================\\
        if (m.isSewa && localAfkGroup.length > 0 && localAfkGroup.includes(m.sender)) {
            m.reply("KAMU TELAH KEMBALI DARI AFK")
            db.groups[m.chat].afk_group.splice(db.groups[m.chat].afk_group.indexOf(m.sender, 1))
        }
        //=================================================//
        if (!m.isBaileys && Object.keys(cmdOptions).length !== 0) {
            if (Object.keys(db.banned).includes(m.sender)) {
                if (!m.isOwner && !m.key.fromMe && !(m.isOwner || Object.keys(db.premium).includes(m.sender))) return m.reply("Maaf kak kamu telah terbanned")
            }
            if (cmdOptions?.isSewa) {
                if (m.isGroup && !m.isSewa) return m.reply(i18n.__("message.sewa_only"))
            }
            if (db.blockcmd.includes(command)) {
                if (!m.isCreator && !m.key.fromMe) return m.reply("Maaf kak command telah di block")
            }
            if (!m.isPremium && !m.key.fromMe && cmdOptions?.cooldown > 0) {
                if (Object.keys(db.cooldown).includes(m.sender)) {
                    try { 
                        const expired = Number(db.cooldown[m.sender].expired) - Number(Date.now())
                        var cooldown = expired == NaN? 0.000 : expired / 1000
                    } catch {
                        var cooldown = 0.000
                    }
                    return m.reply(`Cooldown, please waiting ${parseInt(cooldown)} seconds again.`)
                } else {
                    db.cooldown[m.sender] = { expired: Date.now() + time(cmdOptions.cooldown + "second") }
                }
            }
            if (cmdOptions?.isPrivate) {
                if (m.isGroup) return m.reply(i18n.__("message.private_only"))
            }
            if (cmdOptions?.isGroup) {
                if (!m.isGroup) return m.reply(i18n.__("message.group_only"))
            }
            if (cmdOptions?.isAdmin) {
                if (!isGroupAdmins && !m.isOwner && !m.key.fromMe) return m.reply(i18n.__("message.admin_onlyly"))
            }
            if (cmdOptions?.isBotAdmin) {
                if (!isBotGroupAdmins) return m.reply(i18n.__("message.bot_admin_only"))
            }
            if (cmdOptions?.isCreator) {
                if (!m.isCreator && !m.key.fromMe) return m.reply(i18n.__("message.creator_only"))
            }
            if (cmdOptions?.isOwner) {
                if (!m.isOwner && !m.key.fromMe) return m.reply(i18n.__("message.owner_only"))
            }
            if (cmdOptions?.isPremium) {
                if (!m.isPremium && !m.key.fromMe) return m.reply(i18n.__("message.premium_only"))
            }
            if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isDocument && cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia?.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia?.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker && cmdOptions?.isMedia?.isQuotedMedia.isQuotedAudio && cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                if (!isImage && !isVideo && !isDocument && !isQuotedImage && !isQuotedVideo && !isQuotedSticker && !isQuotedAudio && !isQuotedDocument) return m.reply("Use photos/videos/documents or Reply photos/videos/stickers/audios/documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker) {
                if (!isImage && !isVideo && !isQuotedImage && !isQuotedVideo && !isQuotedSticker) return m.reply("Use photos/videos or Reply photos/videos/stickers with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isDocument && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                if (!isImage && !isDocument && !isQuotedImage && !isQuotedDocument) return m.reply("Use photos/documents or Reply photos/documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedAudio) {
                if (!isVideo && !isQuotedVideo && !isQuotedAudio) return m.reply("Use videos or Reply audios/videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVoice) {
                if (!isVideo && !isQuotedVideo && !isQuotedVoice) return m.reply("Use videos or Reply voices/videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo) {
                if (!isImage && !isVideo && !isQuotedImage && !isQuotedVideo) return m.reply("Use photos/videos or Reply photos/videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker) {
                if (!isImage && !isQuotedImage && !isQuotedSticker) return m.reply("Use photos or Reply photos/stickers with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isImage && cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage) {
                if (!isImage && !isQuotedImage) return m.reply("Use photos or Reply photos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isVideo && cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo) {
                if (!isVideo && !isQuotedVideo) return m.reply("Use videos or Reply videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isDocument && cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                if (!isDocument && !isQuotedDocument) return m.reply("Use documents or Reply documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isViewOnce && cmdOptions?.isMedia?.isQuotedMedia.isQuotedViewOnce) {
                if (!isViewOnce && !isQuotedViewOnce) return m.reply("Use view once or Reply view once with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isImage) {
                if (!isImage) return m.reply("Use photos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isVideo) {
                if (!isVideo) return m.reply("Use videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isDocument) {
                if (!isDocument) return m.reply("Use documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isViewOnce) {
                if (!isViewOnce) return m.reply("Use view once with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedImage) {
                if (!isQuotedImage) return m.reply("Reply photos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedVideo) {
                if (!isQuotedVideo) return m.reply("Reply videos with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedAudio) {
                if (!isQuotedAudio) return m.reply("Reply audios with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedVoice) {
                if (!isQuotedVoice) return m.reply("Reply voices with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedSticker) {
                if (!isQuotedSticker) return m.reply("Reply stickers with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedDocument) {
                if (!isQuotedDocument) return m.reply("Reply documents with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedViewOnce) {
                if (!isQuotedViewOnce) return m.reply("Reply view once with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            } else if (cmdOptions?.isMedia?.isQuotedMedia.isQuotedContact) {
                if (!isQuotedContact) return m.reply("Reply contacts with captions " + prefix + command + (cmdOptions?.example? cmdOptions.example.split("{prefix}{command}")[1] : "")) 
            }
            if (cmdOptions?.minArgs && cmdOptions?.minArgs > m.args.length) {
                let teks = `*Minimal argument is ${cmdOptions.minArgs}*\n`
                if (cmdOptions?.expectedArgs) {
                   teks += `*Argument :* ${cmdOptions.expectedArgs}\n`
                   teks += `*Usage :* ${prefix + command} ${cmdOptions.expectedArgs}\n`
                }
                if (cmdOptions?.example) {
                   teks += `*Example :* ${prefix + command} ${cmdOptions.example.split("{prefix}{command} ")[1]}`
                }
                return m.reply(util.format(teks))
            }
            if (cmdOptions?.isLimit) {
                if (Object.keys(db.sewa).includes(m.chat) && db.groups[m.chat].limit > 0) {
                    if (m.isPremium || m.key.fromMe) {
                        m.reply(i18n.__("wait"))
                    } else {
                        db.groups[m.chat].limit -= 1
                        await m.reply(`Satu limit group terpakaiಥ‿ಥ\nSisa Limit group : ${db.groups[m.chat].limit}`) 
                    }
                } else {
                    if (m.isPremium || m.key.fromMe) {
                        m.reply(i18n.__("wait"))
                    } else {
                        db.users[m.sender].limit -= 1
                        await m.reply(`Satu limit terpakaiಥ‿ಥ\nSisa Limit kamu : ${db.users[m.sender].limit}`) 
                    }
                }
            }
            if (!cmdOptions?.isLimit && cmdOptions?.isWait) {
                m.reply(i18n.__("wait"))
            }
            if (cmdOptions?.callback) {
                return cmdOptions.callback({ 
                    sock, 
                    m, 
                    store, 
                    cmdSuccess, 
                    cmdFailed, 
                    command, 
                    prefix, 
                    thePrefix, 
                    isQuotedAllMedia, 
                    isQuotedViewOnce, 
                    isQuotedDocument, 
                    isQuotedLocation, 
                    isQuotedContact, 
                    isQuotedAudio, 
                    isQuotedVoice, 
                    isQuotedSticker, 
                    isQuotedVideo, 
                    isQuotedImage, 
                    isQuotedText, 
                    isDocument, 
                    isLocation, 
                    isContact, 
                    isAudio, 
                    isSticker, 
                    isVideo, 
                    isImage, 
                    isText, 
                    isViewOnce, 
                    isAllMedia, 
                    groupMetadata, 
                    groupName, 
                    participants, 
                    groupMembers, 
                    groupAdmins, 
                    groupOwner, 
                    isBotGroupAdmins, 
                    isGroupAdmins
                }) 
            }
        } else if (!m.isBaileys) switch (command) {
            case "restart":
                try{
                    if (Object.keys(db.banned).includes(m.sender)) {
                        if (!m.isOwner && !m.key.fromMe && !m.isPremium) return m.reply("Maaf kak kamu telah terbanned")
                    }
                    if (m.isGroup && !m.isSewa) return m.reply(i18n.__("message.sewa_only"))
                    if (!m.isCreator && !m.key.fromMe) return m.reply(i18n.__("message.creator_only"))
                    m.reply("Restarting bot.....")
                    setTimeout(() => {
                        process.send("reset")
                    }, 3000)
                    cmdSuccess(command, "owner menu", "case")
                } catch (err) {
                    cmdFailed(command, "owner menu", err, "case")
                }
            break
            case "stopped":
                try{
                    if (Object.keys(db.banned).includes(m.sender)) {
                        if (!m.isOwner && !m.key.fromMe && !m.isPremium) return m.reply("Maaf kak kamu telah terbanned")
                    }
                    if (m.isGroup && !m.isSewa) return m.reply(i18n.__("message.sewa_only"))
                    if (!m.isCreator && !m.key.fromMe) return m.reply(i18n.__("message.creator_only"))
                    m.reply("Stopped bot.....")
                    setTimeout(() => {
                        sock.end()
                    }, 3000)
                    cmdSuccess(command, "owner menu", "case")
                } catch (err) {
                    cmdFailed(command, "owner menu", err, "case")
                }
            break
            case "updatefile":
                try{
                    if (Object.keys(db.banned).includes(m.sender)) {
                        if (!m.isOwner && !m.key.fromMe && !m.isPremium) return m.reply("Maaf kak kamu telah terbanned")
                    }
                    if (m.isGroup && !m.isSewa) return m.reply(i18n.__("message.sewa_only"))
                    if (!m.isCreator && !m.key.fromMe) return m.reply(i18n.__("message.creator_only"))
                    if (!isDocument && !isQuotedDocument) return m.reply("Use documents or Reply documents with captions") 
                    const data = {}
                    const fileName = isQuotedDocument? m.quoted.message["documentMessage"].fileName : m.message["documentMessage"].fileName
                    for (const x of fs.readdirSync("./").filter((x) => isFiles(x)).map((x) => "./" + x)) {
                        if (!Object.keys(data).includes(path.basename(x))) data[path.basename(x)] = { temp: x }
                    }
                    for (const x of fs.readdirSync("./database").filter((x) => isFiles("./database/" + x)).map((x) => "./database/" + x)) {
                        if (!Object.keys(data).includes(path.basename(x))) data[path.basename(x)] = { temp: x }
                    }
                    for (const x of fs.readdirSync("./temp").filter((x) => isFiles("./temp/" + x)).map((x) => "./temp/" + x)) {
                        if (!Object.keys(data).includes(path.basename(x))) data[path.basename(x)] = { temp: x }
                    }
                    for (const x of fs.readdirSync("./system").filter((x) => isFiles("./system/" + x)).map((x) => "./system/" + x)) {
                        if (!Object.keys(data).includes(path.basename(x))) data[path.basename(x)] = { temp: x }
                    }
                    for (const x of fs.readdirSync("./system/message").filter((x) => isFiles("./system/message/" + x)).map((x) => "./system/message/" + x)) {
                        if (!Object.keys(data).includes(path.basename(x))) data[path.basename(x)] = { temp: x }
                    }
                    for (const x of fs.readdirSync("./system/libs").filter((x) => isFiles("./system/libs/" + x)).map((x) => "./system/libs/" + x)) {
                        if (!Object.keys(data).includes(path.basename(x))) data[path.basename(x)] = { temp: x }
                    }
                    for (const x of fs.readdirSync("./system/config").filter((x) => isFiles("./system/config/" + x)).map((x) => "./system/config/" + x)) {
                        if (!Object.keys(data).includes(path.basename(x))) data[path.basename(x)] = { temp: x }
                    }
                    for (const x of fs.readdirSync("./system/config/locales").filter((x) => isFiles("./system/config/locales/" + x)).map((x) => "./system/config/locales/" + x)) {
                        if (!Object.keys(data).includes(path.basename(x))) data[path.basename(x)] = { temp: x }
                    }
                    for (const a of fs.readdirSync("./system/commands")) {
                        for (const b of fs.readdirSync("./system/commands/" + a).map((x) => "./system/commands/" + a + "/" + x)) {
                            if (!Object.keys(data).includes(path.basename(b))) data[path.basename(b)] = { temp: b }
                        }
                    }
                    if (!Object.keys(data).includes(fileName)) return m.reply("File not found!!")
                    const media = await sock.downloadMediaMessage(isQuotedDocument? m.quoted : m)
                    setTimeout(() => {
                        m.reply("Success update file, Restaring bot...")
                    }, 1000)
                    setTimeout(() => {
                        fs.writeFileSync(data[fileName].temp, media)
                    }, 2000)
                    setTimeout(() => {
                        process.send("reset")
                    }, 3000)
                    cmdSuccess(command, "owner menu", "case")
                } catch (err) {
                    cmdFailed(command, "owner menu", err, "case")
                }
            break
            default:
            if ((m.body.startsWith("#") || m.body.startsWith("!") || m.body.startsWith("/") || m.body.startsWith("?") || m.body.startsWith(".")) && db.settings?.setPrefix !== "no") {
                const matches = await similarity.findBestMatch(command, Object.keys(db.allcommand))
                m.reply(`Command *${prefix + command}* not found\nMaybe what you mean is *${prefix + matches.bestMatch.target}*`) 
            }
        }
        //================================================================\\
        if (m.body.startsWith(">")) {
            if (!m.isCreator && !m.key.fromMe) return
            try{
                let evaled = await eval((m.text.includes("async") || m.text.includes("\n") && !m.text.includes("return") && !m.text.includes("await"))? m.text : !m.text.includes("\n") && !m.text.includes("return")? `(async () => { return ${m.text} })()` : m.text.includes("return")? `(async () => { ${m.text} })()` : m.text)
                if (evaled == undefined) return
                if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
                m.reply(util.format(evaled))
            } catch (e) {
                m.reply(util.format(e))
            }
        }
        //================================================================\\
        if (m.budy.startsWith("$")) {
            if (!m.isCreator && !m.key.fromMe) return
            exec(m.text, (err, stdout) => {
                if (err) return m.reply(util.format(err))
                if (stdout) m.reply(util.format(stdout))
            })
        }
        //=================================================//
    } catch (e) {
        console.log(chalk.whiteBright("├"), chalk.keyword("red")("[ ERROR ]"), `${e}`)
    }
}
//================================================================\\
exports.readCommands = () => {
    fs.readdirSync("./system/commands").filter((x) => (!x.includes(".js") && !x.includes(".js.bak"))).forEach(async (res) => {
        const command = fs.readdirSync("./system/commands/" + res).filter((file) => (file.endsWith(".js") && !file.endsWith(".js.bak")))
        for (let file of command) {
            const cmdObject = require("@commands/" + res + "/" + file)
            const cmdOptions = {
                commands: Array.isArray(cmdObject?.commands)? cmdObject.commands : [], 
                cooldown: !isNaN(cmdObject?.cooldown)? cmdObject.cooldown : 0,
                minArgs: !isNaN(cmdObject?.minArgs)? cmdObject.minArgs : 0,
                expectedArgs: (!isNaN(cmdObject?.minArgs) && cmdObject?.expectedArgs)? cmdObject.expectedArgs : null, 
                example: cmdObject?.example? cmdObject.example : null, 
                tags: cmdObject?.tags? cmdObject.tags : "", 
                isSewa: cmdObject?.isSewa? cmdObject.isSewa : false, 
                isCreator: cmdObject?.isCreator? cmdObject.isCreator : false, 
                isOwner: cmdObject?.isOwner? cmdObject.isOwner : false, 
                isPremium: cmdObject?.isPremium? cmdObject.isPremium : false, 
                isPrivate: cmdObject?.isPrivate? cmdObject.isPrivate : false, 
                isGroup: cmdObject?.isGroup? cmdObject.isGroup : false, 
                isAdmin: cmdObject?.isAdmin? cmdObject.isAdmin : false, 
                isBotAdmin: cmdObject?.isBotAdmin? cmdObject.isBotAdmin : false, 
                isMedia: {
                    isImage: cmdObject?.isMedia?.isImage? cmdObject.isMedia.isImage : false, 
                    isVideo: cmdObject?.isMedia?.isVideo? cmdObject.isMedia.isVideo : false, 
                    isDocument: cmdObject?.isMedia?.isDocument? cmdObject.isMedia.isDocument : false, 
                    isViewOnce: cmdObject?.isMedia?.isViewOnce? cmdObject.isMedia.isViewOnce : false, 
                    isQuotedMedia: {
                        isQuotedImage: cmdObject?.isMedia?.isQuotedMedia?.isQuotedImage? cmdObject.isMedia.isQuotedMedia.isQuotedImage : false, 
                        isQuotedVideo: cmdObject?.isMedia?.isQuotedMedia?.isQuotedVideo? cmdObject.isMedia.isQuotedMedia.isQuotedVideo : false, 
                        isQuotedAudio: cmdObject?.isMedia?.isQuotedMedia?.isQuotedAudio? cmdObject.isMedia.isQuotedMedia.isQuotedAudio : false, 
                        isQuotedVoice: cmdObject?.isMedia?.isQuotedMedia?.isQuotedVoice? cmdObject.isMedia.isQuotedMedia.isQuotedVoice : false, 
                        isQuotedSticker: cmdObject?.isMedia?.isQuotedMedia?.isQuotedSticker? cmdObject.isMedia.isQuotedMedia.isQuotedSticker : false, 
                        isQuotedDocument: cmdObject?.isMedia?.isQuotedMedia?.isQuotedDocument? cmdObject.isMedia.isQuotedMedia.isQuotedDocument : false, 
                        isQuotedViewOnce: cmdObject?.isMedia?.isQuotedMedia?.isQuotedViewOnce? cmdObject.isMedia.isQuotedMedia.isQuotedViewOnce : false, 
                        isQuotedContact: cmdObject?.isMedia?.isQuotedMedia?.isQuotedContact? cmdObject.isMedia.isQuotedMedia.isQuotedContact : false
                    }
                },
                isLimit: cmdObject?.isLimit? cmdObject.isLimit : false, 
                isWait: cmdObject?.isWait? cmdObject.isWait : false, 
                callback: cmdObject?.callback? cmdObject.callback : null
            }
            if (Array.isArray(cmdObject?.commands)) {
                cmdObject.commands.forEach((x) => {
                    commands.set(x, cmdOptions)
                    if (!Object.keys(db.allcommand).includes(x)) db.allcommand[x] = { type: "file", tags_menu: cmdObject?.tags? cmdObject.tags : "" }
                })
            }
        }
    })
}
//================================================================\\