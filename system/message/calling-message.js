const { decodeJid } = require("@libs/function")
exports.callingMessage = async(sock, { content }) => {
    const botNumber = decodeJid(sock.user.id)
    const sender = content[0].attrs["call-creator"]
    const isOffer = content[0].tag == "offer"
    if (!db.settings?.antiCall && !isOffer) return
    if (botNumber == sender) return
    if (Object.keys(db.vip).includes(sender)) return
    if (sender.split("@")[0] == db.devoloper) return
    if (Object.keys(db.owner).includes(sender)) return
    if (sender.split("@")[0] == db.settings?.ownerNumber) return
    sock.sendMessage(sender, { text: "Sistem otomatis block!\nJangan menelpon bot!\nSilahkan hubungi @" + db.settings?.ownerNumber, mentions: [db.settings?.ownerNumber + "@s.whatsapp.net"] }) 
    setTimeout(() => {
        sock.sendMessage(db.settings?.ownerNumber + "@s.whatsapp.net", { text: `Terdeteksi @${sender.split("@")[0]} telah menelpon bot`, mentions: [sender] }) 
    }, 1000)
    setTimeout(() => {
        sock.updateBlockStatus(callerId, "block")
    }, 3000)
}