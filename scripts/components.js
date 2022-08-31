const path = require("path");
const fs = require("fs");

const componentsPath = path.resolve(__dirname, "../components/");

const dir = fs.readdirSync(componentsPath);
const dirSet = new Set(dir);

//删除非数组目录
const deleteDir = ["fonts", "index.tsx", "styles", "template", "utils", "ux"];
deleteDir.forEach(dir => dirSet.delete(dir));

const allComponents = Array.from(dirSet);

module.exports = allComponents;