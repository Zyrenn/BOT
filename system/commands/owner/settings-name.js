module.exports = {
    commands: ["setname"],
    tags: "owner menu", 
    expectedArgs: "<teks>",
    example: "{prefix}{command} sockJS BOT",
    minArgs: 1,
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            await sock.updateProfileName(m.text)
            await m.reply("Success changed name " + m.text)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}