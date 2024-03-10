module.exports = {
    commands: ["add","kick","promote","demote"],
    tags: "group menu", 
    cooldown: 13,
    isSewa: true,
    isGroup: true,
    isAdmin: true,
    isBotAdmin: true,
    callback: async ({ sock, m, groupAdmins, groupMembers, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.input.length == 0) return m.reply("Reply/Tag/nomer")
            if (m.input[0].startsWith("08")) return m.reply("Gunakan code negara kak")
            if (m.input.includes(m.botNumber)) return m.reply("Itu nomer bot kak") 
            if (command == "add") {
                if (m.input.filter((x) => groupMembers.includes(x)).length > 0) return m.reply("Participants detect " + m.input.filter((x) => groupMembers.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
            } else if (command == "kick") {
                if (m.input.filter((x) => !groupMembers.includes(x)).length > 0) return m.reply("No participants detect " + m.input.filter((x) => !groupMembers.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
            } else if (command == "promote") {
                if (m.input.filter((x) => !groupMembers.includes(x)).length > 0) return m.reply("No participants detect " + m.input.filter((x) => !groupMembers.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                if (m.input.filter((x) => groupAdmins.includes(x)).length > 0) return m.reply("Admins detect " + m.input.filter((x) => groupAdmins.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
            } else if (command == "promote") {
                if (m.input.filter((x) => !groupMembers.includes(x)).length > 0) return m.reply("No participants detect " + m.input.filter((x) => !groupMembers.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
                if (m.input.filter((x) => !groupAdmins.includes(x)).length > 0) return m.reply("No admins detect " + m.input.filter((x) => !groupAdmins.includes(x)).map((x) => "@" + x.split("@")[0]).join(" ")) 
            }
            sock.groupParticipantsUpdate(m.chat, m.input, command == "kick"? "remove" : command).then((results) => {
                const failed = results.filter((x) => Number(x.status) !== 200).map((x) => "@" + x.jid.split("@")[0])
                const success = results.filter((x) => Number(x.status) == 200).map((x) => "@" + x.jid.split("@")[0])
                if (success.length > 0 && failed.length > 0) m.reply("Success " + command + " to " + success.join(" ") + "\n\nFailed " + command + " to " + failed.join(" ")) 
                if (success.length > 0 && failed.length == 0) m.reply("Success " + command + " to " + success.join(" ")) 
                if (success.length == 0 && failed.length > 0) m.reply("Failed " + command + " to " + failed.join(" ")) 
            }) 
            cmdSuccess(command, "group menu")
        } catch (error) {
            cmdFailed(command, "group menu", error)
        }
    }
}