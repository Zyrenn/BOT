module.exports = {
    commands: ["pay"],
    tags: "store menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (db.groups[m.chat].store.payment.image !== "") {
                sock.sendMessage(m.chat, { image: { url: db.groups[m.chat].store.payment.image }, caption: db.groups[m.chat].store.payment.text }, { quoted: m  }) 
                cmdSuccess(command, "store menu")
            } else if (db.groups[m.chat].store.payment.text !== "") {
                m.reply(db.groups[m.chat].store.payment.text)
                cmdSuccess(command, "store menu")
            } else m.reply("Belum ada payment di group ini")
        } catch (error) {
            cmdFailed(command, "store menu", error)
        }
    }
}