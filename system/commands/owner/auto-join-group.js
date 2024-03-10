module.exports = {
    commands: ["autojoin"],
    tags: "owner menu", 
    cooldown: 13,
    isSewa: true,
    isCreator: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "on" || m.text == "1") {
                if (db.settings.autoJoin == true) return m.reply("Sudah active")
                db.settings.autoJoin = true
                m.reply("Mode auto join group telah active")
                cmdSuccess(command, "owner menu")
            } else if (m.text == "off" || m.text == "0") {
                if (db.settings.autoJoin == false) return m.reply("Sudah non active")
                db.settings.autoJoin = false
                m.reply("Mode auto join group telah non active")
                cmdSuccess(command, "owner menu")
            } else {
                m.reply("\`\`\`「 MODE AUTO JOIN GROUP 」\`\`\`\n\n0. off\n1. on")
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}