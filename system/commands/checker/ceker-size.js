const { exec } = require("child_process") 
const { isFiles } = require("@libs/function") 
module.exports = {
    commands: ["ceksize"],
    tags: "checker menu", 
    cooldown: 13,
    isSewa: true,
    callback: async ({ m, command, cmdSuccess, cmdFailed }) => {
        try {
            let teks = "┌──⭓「 *SIZE BOTZ* 」\n│\n"
            let teksPetik = (text) => {
                 return "```" + text + "```"
            }
            exec("du -hsc *", (err, stdout) => {
                if (err) return cmdFailed(command, "checker menu", err)
                const data = [...stdout.split("\n").filter((x) => (x !== "" && !isFiles(x.split("\t")[1]) && x.split("\t")[1] !== "total")), ...stdout.split("\n").filter((x) => (x !== "" && isFiles(x.split("\t")[1]))), ...stdout.split("\n").filter((x) => (x !== "" && x.split("\t")[1] == "total"))].map((x) => {
                    const object = {}
                    object[x.split("\t")[1]] = x.split("\t")[0].includes("G")? `${parseFloat(x.split("\t")[0])}GB` : x.split("\t")[0].includes("M")? `${parseFloat(x.split("\t")[0])}MB` : `${parseFloat(x.split("\t")[0])}KB`
                    return object
                })
                for (let x = 0; x < (data.length -1); x++) {
                    teks += `│⭔ ${teksPetik(Object.keys(data[x])[0] + " : " + data[x][Object.keys(data[x])[0]])}\n`
                }
                teks += `│\n└────────────⭓\n\n*Total Size : ${data[(data.length -1)][Object.keys(data[(data.length -1)])[0]]}*`
                m.reply(teks)
                cmdSuccess(command, "checker menu")
            })  
        } catch (error) {
            cmdFailed(command, "checker menu", error)
        }
    }
}