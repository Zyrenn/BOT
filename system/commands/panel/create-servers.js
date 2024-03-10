const util = require("util") 
const { sleep } = require("@libs/function")
const { pterodactyl } = require("decode.id")
module.exports = {
    commands: ["addsrv"],
    cooldown: 13,
    tags: "panel menu", 
    isSewa: true,
    isPremium: true,
    callback: async ({ m, cmdSuccess, cmdFailed, command }) => {
        try {
            const users = m.quoted && m.isMention && m.mentionedJid.includes(m.quoted.sender)? m.mentionedJid : m.isMention && m.quoted? [...m.mentionedJid, m.quoted.sender] : m.isMention? m.mentionedJid : m.quoted? Array(m.quoted.sender) : []
            const text = m.text.split("@").filter((x) => (!users.includes(x + "@s.whatsapp.net") && x !== "")) 
            const create = text.filter((x) => (x.toLowerCase().includes("gb") && !isNaN(Number(x.toLowerCase().split("gb")[0])))).length? text.find((x) => (x.toLowerCase().includes("gb") && !isNaN(Number(x.toLowerCase().split("gb")[0])))) : "Unlimited"
            const users_id = text.filter((x) => !(x.toLowerCase().includes("gb") && !isNaN(Number(x.toLowerCase().split("gb")[0])))).length? text.find((x) => !(x.toLowerCase().includes("gb") && !isNaN(Number(x.toLowerCase().split("gb")[0])))) : null
            m.reply(util.format({ users, text, create, users_id }))
            /*if (users.length > 0) {

                
                for (const x of users) {
                
                }
            } else {

            }*/
        } catch (error) {
            cmdFailed(command, "panel menu", error)
        }
    }
}