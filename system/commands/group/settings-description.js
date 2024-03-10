module.exports = {
    commands: ["setdesc"],
    tags: "group menu", 
    expectedArgs: "<teks>",
    example: "{prefix}{command} Demon's BOT",
    minArgs: 1,
    cooldown: 13,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupMetadata, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == groupMetadata.desc) return m.reply("Coba pakai nama lain")
            await sock.groupUpdateDescription(m.chat, m.text)
            setTimeout(() => {
                m.reply("Success changed description " + m.text)
            }, 1000)
            cmdSuccess(command, "group menu")
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}