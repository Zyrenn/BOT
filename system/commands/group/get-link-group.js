module.exports = {
    commands: ["linkgc"],
    tags: "group menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isBotAdmin: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            m.reply("https://chat.whatsapp.com/" + (await sock.groupInviteCode(m.chat)))
            cmdSuccess(command, "group menu")
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}