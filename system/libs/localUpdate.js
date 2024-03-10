const fs = require("fs") 
const path = require("path") 
const chalk = require("chalk") 
const chokidar = require("chokidar") 

const localUpdate = () => {
    chokidar.watch([path.join(process.cwd(), "system")], { persistent: true })
    .on("change", (Path) => {
        if (Path.endsWith(".js") && !Path.endsWith(".json")) {
            console.log(chalk.whiteBright("├"), chalk.red("[ UPDATE ]"), chalk.whiteBright(Path))
            fs.watchFile(Path, () => {
                fs.unwatchFile(Path)
                delete require.cache[Path]
                require(Path)
            })
        }
    })
}


module.exports = { localUpdate }