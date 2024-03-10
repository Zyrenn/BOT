module.exports = {
    commands: ["getname"],
    tags: "main menu", 
    cooldown: 13,
    isSewa: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (!m.input) return m.reply("Reply/Tag/nomer")
            let teks = ""
            for (const x of m.input) {
                if (m.input.length == 1) teks += `${Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]}`
                if (m.input.length > 1) teks += `@${x.split("@")[0]} : ${Object.keys(db.users).includes(x)? db.users[x].name : x.split("@")[0]}\n`
            }
            m.reply(teks) 
            cmdSuccess(command, "main menu")
        } catch (error) {
            cmdFailed(command, "main menu", error)
        }
    }
}