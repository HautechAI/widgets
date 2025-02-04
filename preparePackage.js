import * as fs from "fs";

const { name, version, dependencies } = JSON.parse(
  fs.readFileSync("./package.json")
);

const newPackage = {
  name,
  version,
  dependencies: {
    ["@hautechai/sdk"]: dependencies["@hautechai/sdk"],
  },

  main: "./index.cjs",
  module: "./index.mjs",
  types: "./index.d.ts",
  exports: {
    ".": {
      require: "./index.cjs",
      import: "./index.mjs",
      types: "./index.d.ts",
    },
  },
};

fs.writeFileSync("./dist/package.json", JSON.stringify(newPackage, null, 2));
fs.writeFileSync("./dist/README.md", fs.readFileSync("./README.md"));
