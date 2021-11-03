#! /usr/bin/env node
"use strict";
const path = require("path");
const inquirer = require("inquirer");
const fs = require("fs-extra");
const chalk = require("chalk");
const red = chalk.red;
const green = chalk.green;
const { downLoad, userPath } = require("./utils.js");
let proName;
//cli入口
console.log("\n金和前端cli 版本号 0.1.1\n\n大吉大利，今晚吃鸡\n");
//选择模板
const promptList = [
  {
    type: "input",
    message: "项目名称",
    name: "name",
    default: "jinhedemo1",
  },
  {
    type: "list",
    message: "请选择相应的模板，回车结束",
    name: "template",
    choices: ["Vue", "React", "H5"],
  },
];
//处理用户选择
inquirer.prompt(promptList).then((answer) => {
  proName = answer.name;
  downLoad(renameFile, answer);
  const temDir = path.join(__dirname, "template/src");
  const desDir = process.cwd();
});

//删除多余文件
async function delFile(parentFile, callback) {
  try {
    await fs.remove(parentFile + "/.git");
    await fs.remove(parentFile + "/package-lock.json");
    callback && callback();
    console.log(green("delete file success! "));
  } catch (err) {
    console.log(red(err));
  }
}
//重命名git文件为项目名
async function renameFile() {
  const oldPath = userPath + "yuyan2";
  const newPath = userPath + proName;
  try {
    await fs.rename(oldPath, newPath);
    delFile(newPath)
  } catch (err) {
    console.log(red(err));
  }
}
//修改配置文件
async function rewriteJson() {
  const jsonPath = userPath + proName + "/package.json";
  try {
    const json = await fs.readJson(jsonPath);
    json.name = proName;
    json.description = `this project os based ${proName}`;
    await fs.writeJson(jsonPath, json, { spaces: "\t" });
  } catch (err) {
    console.log(red(err));
  }
}
