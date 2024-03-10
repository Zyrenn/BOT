module.exports = {
    commands: ["restrict"],
    tags: "group menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupMetadata, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (groupMetadata.restrict == false) return m.reply("Sudah active")
                sock.groupSettingUpdate(m.chat, "unlocked")
                m.reply("Mode restrict telah active")
                cmdSuccess(command, "group menu")
            } else if (m.text == "off" || m.text == "0") {
                if (groupMetadata.restrict == true) return m.reply("Sudah non active")
                sock.groupSettingUpdate(m.chat, "locked")
                m.reply("Mode restrict telah non active")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 GROUP SETTINGS 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}