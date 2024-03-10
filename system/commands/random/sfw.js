const { toFirstCase } = require("@libs/function")
const { random_sfw } = require("decode.id")
module.exports = {
    commands: ["awoo","megumin","neko","shinobu","waifu","maid","marin-kitagawa","mori-calliope","raiden-shogun","oppai","selfies","uniform"], 
    tags: "sfw menu",
    cooldown: 13,
    isSewa: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            const name = command.split("-").length == 2? (command.split("-")[0] + toFirstCase(command.split("-")[1])) : command
            if (!Object.keys(random_sfw).includes(name)) return m.reply("Name not found") 
            const { status, data, message } = await random_sfw[name]() 
            if (status) {
                sock.sendMessage(m.chat, { image: data.buffer }, { quoted: m })
                cmdSuccess(command, "sfw menu")
            } else {
                m.reply(message) 
            }
        } catch (error) {
            cmdFailed(command, "sfw menu", error)
        }
    }
}

