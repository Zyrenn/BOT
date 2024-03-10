module.exports = {
    commands: ["profile"],
    tags: "main menu", 
    cooldown: 13,
    isSewa: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            let teks = "\`\`\`「  PROFILE USERS  」\`\`\`\n\n"
            teks += ` *•* Name : ${db.users[m.sender].name}\n`
            teks += ` *•* Users : @${m.senderNumber}\n`
            teks += ` *•* Saldo : Rp. ${db.users[m.sender].balance}\n`
            teks += ` *•* Limit : ${db.users[m.sender].limit}\n`
            teks += ` *•* Level : ${db.users[m.sender].level}\n`        
            teks += ` *•* Status : ${db.devoloper == m.senderNumber? "Devoloper" : (m.isCreator || m.key.fromMe)? "Creator" : m.isOwner? "Owner" : Object.keys(db.premium).includes(m.sender)? "Premium" : "Free Users"}`
            m.reply(teks) 
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}
        
