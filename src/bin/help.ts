import ora from "ora";

// sleep
export async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

// loading
export async function loading(
  text: string,
  fn: any,
  ...args: any[]
): Promise<any> {
  const spinner = ora({ text, color: "green" });
  spinner.start();
  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    // 加载失败
    spinner.fail("加载失败，正在重试");
    await sleep(1000);
    return loading(text, fn, ...args);
  }
}
