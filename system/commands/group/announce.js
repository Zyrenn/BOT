module.exports = {
    commands: ["group"],
    tags: "group menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupMetadata, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "close" || m.text == "2") {
                if (groupMetadata.announce == true) return m.reply("Group sudah di tutup")
                sock.groupSettingUpdate(m.chat, "announcement")
                m.reply("Success menutup group")
                cmdSuccess(command, "group menu")
            } else if (m.text == "open" || m.text == "1") {
                if (groupMetadata.announce == false) return m.reply("Group sudah di buka")
                sock.groupSettingUpdate(m.chat, "not_announcement")
                m.reply("Success membuka group")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 GROUP OPEN/CLOSE 」\`\`\`\n\n1. open\n2. close")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}