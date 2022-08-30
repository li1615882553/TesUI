const path = require("path");
const fs = require("fs");
const allComponents = require("./components");

const componentsPath = path.resolve(__dirname, "../components/");
if (fs.existsSync(path.resolve(componentsPath, './index.tsx'))) {
    fs.unlinkSync(path.resolve(componentsPath, './index.tsx'));
}

let importStr = '';
let exportStr = `export {\r\n`;
allComponents.forEach((item) => {
    importStr += `import ${item} from './${item}';\r\n`;
    exportStr += `  ${item},\r\n`;
})
importStr += `\r\n`;
exportStr += `  };\r\n`;

fs.writeFileSync(path.resolve(componentsPath, './index.tsx'), importStr + exportStr);