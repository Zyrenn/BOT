module.exports = {
    commands: ["revoke"],
    tags: "group menu", 
    cooldown: 13,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            await m.reply("Success changed link group to https://chat.whatsapp.com/" + (await sock.groupRevokeInvite(m.chat)))
            cmdSuccess(command, "group menu")
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}