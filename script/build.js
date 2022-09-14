import * as esbuild from "esbuild";

console.log(">>>>>>>打包开始");
await esbuild
  .build({
    bundle: true,
    entryPoints: ["src/bin/index.ts"],
    outfile: "index.cjs",
    format: "cjs",
    platform: "node",
    target: "esnext",

    plugins: [],
  })
  .catch(() => process.exit(1));

console.log(">>>>>>>打包结束");
