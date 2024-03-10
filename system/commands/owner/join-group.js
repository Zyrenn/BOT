module.exports = {
    commands: ["join"],
    tags: "owner menu",
    cooldown: 13,
    isSewa: true,
    isOwner: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text.includes("https://chat.whatsapp.com/")) {
                if (m.text.split(".com/")[1] == "") return m.reply("Error link")
                const jid = await sock.groupAcceptInvite(m.text.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0]) 
                const metadata = (await sock.groupMetadata(jid).catch(e => {})) || {}
                const groupName = Object.keys(metadata).length > 0? metadata?.subject : ""
                await m.reply(`Success join group ${groupName? groupName : ""}`)
                cmdSuccess(command, "owner menu")
            } else if (m.quoted && m.quoted.body.includes("https://chat.whatsapp.com/")) {
                if (m.quoted.body.split(".com/")[1] == "") return m.reply("Error link")
                const jid = await sock.groupAcceptInvite(m.quoted.body.split(".com/")[1].split("#")[0].split(" ").filter((x) => x !== "")[0])
                const metadata = (await sock.groupMetadata(jid).catch(e => {})) || {}
                const groupName = Object.keys(metadata).length > 0? metadata?.subject : ""
                await m.reply(`Success join group ${groupName? groupName : ""}`)
                cmdSuccess(command, "owner menu")
            } else m.reply("Link group?") 
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}