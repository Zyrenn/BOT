module.exports = {
    commands: ["setkey"],
    tags: "owner menu", 
    expectedArgs: "<teks>",
    example: "{prefix}{command} aioakwnnwnekappqoqq@removebg",
    minArgs: 1,
    cooldown: 13,
    isSewa: true,
    isCreator: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            if (m.text.endsWith("@removebg") && m.text.split("@removebg")[0] !== "" || m.text.endsWith("#removebg") && m.text.split("#removebg")[0] !== "") {
                db.settings.local_key.remove_background = m.text.endsWith("@removebg")? m.text.split("@removebg")[0] : m.text.endsWith("#removebg")? m.text.split("#removebg")[0] : ""
                m.reply("Success changed key removebg " + m.text.endsWith("@removebg")? m.text.split("@removebg")[0] : m.text.endsWith("#removebg")? m.text.split("#removebg")[0] : "")
                cmdSuccess(command, "owner menu")
            } else if (m.text.endsWith("@openai") && m.text.split("@openai")[0] !== "" || m.text.endsWith("#openai") && m.text.split("#openai")[0] !== "") {
                db.settings.local_key.open_ai = m.text.endsWith("@openai")? m.text.split("@openai")[0] : m.text.endsWith("#openai")? m.text.split("#openai")[0] : ""
                m.reply("Success changed key open ai " + m.text.endsWith("@openai")? m.text.split("@openai")[0] : m.text.endsWith("#openai")? m.text.split("#openai")[0] : "")
                cmdSuccess(command, "owner menu")
            } else if (!m.text.includes("@removebg") || !m.text.includes("@openai") || !m.text.includes("#removebg") || !m.text.includes("#openai")) {
                m.reply("removebg or openai") 
            } else {
                m.reply("Example not found!!") 
            }
        } catch (error) {
            cmdFailed(command, "owner menu", error)
        }
    }
}