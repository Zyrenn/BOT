module.exports = {
    commands: ["setantilinktele"],
    tags: "group menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text == "delete" || m.text == "1") {
                if (db.groups[m.chat].anti_link_telegram.type == "delete") return m.reply("Sudah active")
                db.groups[m.chat].anti_link_telegram.type = "delete"
                m.reply("Success changed anti link telegram to delete")
                cmdSuccess(command, "group menu")
            } else if (m.text == "kick" || m.text == "2") {
                if (db.groups[m.chat].anti_link_telegram.type == "kick") return m.reply("Sudah active")
                db.groups[m.chat].anti_link_telegram.type = "kick"
                m.reply("Success changed anti link telegram to kick")
                cmdSuccess(command, "group menu")
            } else if (m.text == "all" || m.text == "3") {
                if (db.groups[m.chat].anti_link_telegram.type == "all") return m.reply("Sudah active")
                db.groups[m.chat].anti_link_telegram.type = "all"
                m.reply("Success changed anti link telegram to all")
                cmdSuccess(command, "group menu")
            } else {
                m.reply("\`\`\`「 SETTINGS ANTI LINK TELEGRAM 」\`\`\`\n\n1. delete\n2. kick\n3. all")
            }
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}