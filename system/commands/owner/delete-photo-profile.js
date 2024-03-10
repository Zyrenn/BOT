const { isUrl } = require("@libs/function") 
module.exports = {
    commands: ["delpp"],
    tags: "owner menu", 
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            try{
                var isProfile = isUrl((await sock.profilePictureUrl(m.botNumber, "image")))? true : false
            } catch {
                var isProfile = false
            }
            if (!isProfile) return m.reply("No photo profile!!") 
            await sock.removeProfilePicture(m.botNumber) 
            await m.reply("Success delete photo profile")
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}