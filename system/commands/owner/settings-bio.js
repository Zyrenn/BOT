module.exports = {
    commands: ["setbio"],
    tags: "owner menu", 
    expectedArgs: "<teks>",
    example: "{prefix}{command} Yang baca yatim",
    minArgs: 1,
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            await sock.updateProfileStatus(m.text)
            await m.reply("Success changed bio " + m.text)
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}