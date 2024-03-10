const fs = require("fs") 
const util = require("util") 
const i18n = require("i18n") 
const { imageToUrl } = require("@libs/localConverter")
module.exports = {
    commands: ["setpay"],
    tags: "store menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed, isImage, isQuotedImage }) => {
        try {
            if (isQuotedImage || image) {
                const teks = (m.quoted && m.text == "")? m.quoted.body : m.text
                const id = fs.readdirSync("./temp").filter((x) => !x.endsWith("@4.0.4")).length + 1
                const media = await sock.downloadAndSaveMediaMessage((isQuotedImage? m.quoted : m), "./temp/" + id)
                const { status, data, message } = await imageToUrl(media) 
                if (!status) return m.reply(util.format(message))
                db.groups[m.chat].store.payment.image = data
                if (teks !== "") {
                    db.groups[m.chat].store.payment.text = teks
                }
                m.reply("Success set payment.")
                cmdSuccess(command, "store menu")
            } else if (m.quoted && m.quoted.body !== "" && m.text == "") {
                db.groups[m.chat].store.payment.text = m.quoted.body
                m.reply("Success set payment.")
                cmdSuccess(command, "store menu")
            } else if (m.text !== "") {
                db.groups[m.chat].store.payment.text = m.text
                m.reply("Success set payment.")
                cmdSuccess(command, "store menu")
            } else {
                m.reply("Example not found")
            }
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}