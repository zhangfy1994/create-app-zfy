import path from "node:path";
import inquirer from "inquirer";
import fs from "fs-extra";
import { getTemplate } from "./get-template";

async function create(projectName: string, option: any) {
  // 当前工作目录
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, projectName);

  if (fs.existsSync(targetDirectory)) {
    if (option.force) {
      await fs.remove(targetDirectory);
      getTemplate(projectName);
    } else {
      const { isOverwrite } = await inquirer.prompt([
        {
          name: "isOverwrite",
          message: "项目已存在，是否覆盖？",
          type: "list",
          choices: [
            {
              name: "Overwrite",
              value: true,
            },
            {
              name: "Cancel",
              value: false,
            },
          ],
        },
      ]);

      if (isOverwrite) {
        await fs.remove(targetDirectory);
        getTemplate(projectName);
      }
    }
  } else {
    getTemplate(projectName);
  }
}

export default create;
