#! /usr/bin/env node
import { program } from "commander";
import chalk from "chalk";
import require from "../lib/require.js";
import create from "./create.js";

const packageInfo = require("../package.json");

// 配置名称 版本
program
  .name("create-app")
  .usage(`<command> [option]`)
  .version(packageInfo.version);

// create 命令
program
  .command("create <project-name>")
  .description("create new project")
  .option("-f, --force", "overwrite target directory if it exists")
  .action((projectName, cmd) => {
    create(projectName, cmd);
  });

// config 命令
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set value")
  .option("-d, --delete <key>", "delete value by key")
  .action((value, keys) => {
    console.log(value, keys);
  });

// help提示高亮
program.on("--help", () => {
  console.log();
  console.log(
    `Run ${chalk.cyan(
      "create-app <command> --help"
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv);
