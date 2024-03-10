const moment = require("moment-timezone") 
module.exports = {
    commands: ["creategc"],
    tags: "owner menu", 
    expectedArgs: "<teks>",
    example: "{prefix}{command} BOT WHATSAPP",
    minArgs: 1,
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            let create = await sock.groupCreate(m.text, [])
            let code = await sock.groupInviteCode(create.id)
            let teks = "\`\`\`「  CREATION GROUP MESSAGE  」\`\`\`\n\n"
            teks += `▸ Name : ${create.subject}\n`
            teks += `▸ Owner : @${create.owner.split("@")[0]}\n`
            teks += `▸ Creation : ${moment(create.creation * 1000).tz("Asia/Jakarta").format("DD/MM/YYYY HH:mm:ss")}\n`        
            teks += `▸ Link : https://chat.whatsapp.com/${code}`
            m.reply(teks) 
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}