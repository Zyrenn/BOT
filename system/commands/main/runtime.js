const { runtime } = require("@libs/function")
module.exports = {
    commands: ["runtime"],
    tags: "main menu", 
    cooldown: 13,
    isSewa: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            m.reply(`${runtime(process.uptime())}`)
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}