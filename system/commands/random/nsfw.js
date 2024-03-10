const { toFirstCase } = require("@libs/function")
const { random_nsfw } = require("decode.id")
module.exports = {
    commands: ["neko2","trap","waifu2"], 
    tags: "nsfw menu",
    cooldown: 13,
    isSewa: true,
    isPremium: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            const name = command.split("-").length == 2? (command.split("-")[0] + toFirstCase(command.split("-")[1])) : command
            if (!Object.keys(random_nsfw).includes(name)) return m.reply("Name not found") 
            const { status, data, message } = await random_nsfw[name]() 
            if (status) {
                sock.sendMessage(m.chat, { image: data.buffer }, { quoted: m })
                cmdSuccess(command, "nsfw menu")
            } else {
                m.reply(message) 
            }
        } catch (error) {
            cmdFailed(command, "nsfw menu", error)
        }
    }
}

