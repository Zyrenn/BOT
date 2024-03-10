const { isUrl } = require("@libs/function") 
module.exports = {
    commands: ["delppgc"],
    tags: "group menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            try{
                var isProfile = isUrl((await sock.profilePictureUrl(m.chat, "image")))? true : false
            } catch {
                var isProfile = false
            }
            if (!isProfile) return m.reply("No photo profile!!") 
            await sock.removeProfilePicture(m.chat) 
            await m.reply("Success delete photo profile")
            cmdSuccess(command, "group menu")
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}