module.exports = {
    commands: ["setsubject"],
    tags: "group menu", 
    expectedArgs: "<teks>",
    example: "{prefix}{command} Demon's BOT",
    minArgs: 1,
    cooldown: 13,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupName, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == groupName) return m.reply("Coba pakai nama lain")
            await sock.groupUpdateSubject(m.chat, m.text)
            setTimeout(() => {
                m.reply("Success changed subject " + m.text)
            }, 1000)
            cmdSuccess(command, "group menu")
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}