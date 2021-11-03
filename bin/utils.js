
const crossSpawn = require("cross-spawn")
const spawn = crossSpawn.sync
const fs = require("fs-extra")
const chalk = require("chalk")
const red = chalk.red
const green = chalk.green
//当前node文件目录
const userPath = process.cwd().replace("/\\/g","/") + "/"
//下载模板
function downLoad (callback, template){
    const result = spawn(
        'git',
        ['clone', 'https://github.com/Zero-Qi/yuyan2.git'],
        {stdio: 'inherit'}
    )
    callback?.()
}
module.exports = {
    downLoad,
    userPath
}   