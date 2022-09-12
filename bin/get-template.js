import inquirer from "inquirer";
import util from "node:util";
import path from "node:path";
import fs from "fs-extra";
import download from "download-git-repo";
import { getZhuRongRepo, getTagsByRepo } from "./api.js";
import { loading } from "./help.js";

// 下载模版
export async function downloadGitRepo(...args) {
  const downloadPromise = util.promisify(download);
  return downloadPromise(...args);
}

export async function getTemplate(projectName) {
  // 获取模版
  const repoList = await loading("查询模版中...", getZhuRongRepo);
  const repos = repoList.map((repo) => repo.name);

  // 用户选择模版
  const { repo } = await inquirer.prompt([
    {
      name: "repo",
      message: "选择模版",
      type: "list",
      choices: repos,
    },
  ]);

  // 获取模版tags
  const repoTags = await loading("查询tags中...", getTagsByRepo, repo);
  const tags = repoTags.map((tag) => tag.name);

  // 用户选择模版tag
  const { tag } = await inquirer.prompt([
    {
      name: "tag",
      message: "选择模版tag",
      type: "list",
      choices: tags,
    },
  ]);

  const downloadUrl = `zhurong-cli/${repo}${tag ? "#" + tag : ""}`;
  const template = path.join(process.cwd(), projectName);
  await loading("下载模版中...", downloadGitRepo, downloadUrl, template);

  try {
    const templateJson = await fs.readJSON(path.join(template, "package.json"));
    templateJson.name = projectName;
    await fs.writeJson(path.join(template, "package.json"), templateJson, {
      spaces: 2,
    });
  } catch (error) {}
}
