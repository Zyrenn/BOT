const fs = require("fs") 
const { basename } = require("path") 
const { isFiles } = require("@libs/function") 
module.exports = {
    commands: ["getfile"],
    tags: "owner menu", 
    expectedArgs: "<teks>",
    example: "{prefix}{command} package.json",
    cooldown: 13,
    minArgs: 1,
    isSewa: true,
    isCreator: true,
    callback: async ({ sock, m, command, cmdSuccess, cmdFailed }) => {
        try {
            const data = {}
            for (const x of fs.readdirSync("./").filter((x) => isFiles(x)).map((x) => "./" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for (const x of fs.readdirSync("./database").filter((x) => isFiles("./database/" + x)).map((x) => "./database/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for (const x of fs.readdirSync("./temp").filter((x) => isFiles("./temp/" + x)).map((x) => "./temp/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for (const x of fs.readdirSync("./system").filter((x) => isFiles("./system/" + x)).map((x) => "./system/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for (const x of fs.readdirSync("./system/message").filter((x) => isFiles("./system/message/" + x)).map((x) => "./system/message/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for (const x of fs.readdirSync("./system/libs").filter((x) => isFiles("./system/libs/" + x)).map((x) => "./system/libs/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for (const x of fs.readdirSync("./system/config").filter((x) => isFiles("./system/config/" + x)).map((x) => "./system/config/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for (const x of fs.readdirSync("./system/config/locales").filter((x) => isFiles("./system/config/locales/" + x)).map((x) => "./system/config/locales/" + x)) {
                if (!Object.keys(data).includes(basename(x))) data[basename(x)] = { temp: x }
            }
            for (const a of fs.readdirSync("./system/commands")) {
                for (const b of fs.readdirSync("./system/commands/" + a).map((x) => "./system/commands/" + a + "/" + x)) {
                    if (!Object.keys(data).includes(basename(b))) data[basename(b)] = { temp: b }
                }
            }
            if (!Object.keys(data).includes(basename(m.text))) return m.reply("File not found")
            await sock.sendMessage(m.chat, { document: fs.readFileSync(data[basename(m.text)].temp), fileName: basename(m.text), mimetype: "application/bin" }, { quoted: m })
            cmdSuccess(command, "owner menu")
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}