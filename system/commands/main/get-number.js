module.exports = {
    commands: ["getno"],
    tags: "main menu", 
    cooldown: 13,
    isSewa: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (!m.isMention && !m.quoted) return m.reply("Reply/Tag")
            let teks = ""
            for (const x of m.input) {
                if (m.input.length == 1) teks += `${x.split("@")[0]}`
                if (m.input.length > 1) teks += `@${x.split("@")[0]} : ${x.split("@")[0]}\n`
            }
            m.reply(teks) 
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}