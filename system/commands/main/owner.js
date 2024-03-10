module.exports = {
    commands: ["owner"],
    tags: "main menu", 
    cooldown: 13,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            const contact = []
            if (m.isOwner) {
                for (const x of [db.settings.ownerNumber + "@s.whatsapp.net", db.devoloper + "@s.whatsapp.net", ...Object.keys(db.owner), ...Object.keys(db.vip)]) {
                    if (!contact.includes(x)) contact.push(x) 
                }
            } else {
                for (const x of [db.settings.ownerNumber + "@s.whatsapp.net", db.devoloper + "@s.whatsapp.net", ...Object.keys(db.vip)]) {
                    if (!contact.includes(x)) contact.push(x) 
                }
            }
            if (contact.length > 1) {
                sock.sendKontak(m.chat, contact, m) 
            } else {
                sock.sendContact(m.chat, contact[0].split("@")[0], (contact[0].split("@")[0] == db.settings.ownerNumber? db.settings.ownerName : Object.keys(db.users).includes(contact[0])? db.users[contact[0]].name : contact[0].split("@")[0]), m) 
            }
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}
