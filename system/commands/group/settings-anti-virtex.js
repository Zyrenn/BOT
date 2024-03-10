module.exports = {
    commands: ["setantibug"],
    tags: "group menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "delete" || m.text == "1") {
                if (db.groups[m.chat].anti_virtex.type == "delete") return m.reply("Sudah active")
                db.groups[m.chat].anti_virtex.type = "delete"
                m.reply("Success changed anti bug to delete")
                cmdSuccess(command, "group menu")
            } else if (m.text == "kick" || m.text == "2") {
                if (db.groups[m.chat].anti_virtex.type == "kick") return m.reply("Sudah active")
                db.groups[m.chat].anti_virtex.type = "kick"
                m.reply("Success changed anti bug to kick")
                cmdSuccess(command, "group menu")
            } else if (m.text == "all" || m.text == "3") {
                if (db.groups[m.chat].anti_virtex.type == "all") return m.reply("Sudah active")
                db.groups[m.chat].anti_virtex.type = "all"
                m.reply("Success changed anti bug to all")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 SETTINGS ANTI BUG 」\`\`\`\n\n1. delete\n2. kick\n3. all")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}