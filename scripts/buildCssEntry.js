const path = require("path");
const fs = require("fs");
const componentsPath = path.resolve(__dirname, "../components/");
const stylesPath = path.resolve(__dirname, "../components/styles");
const allComponents = require("./components");

//如果存在 theme.index.scss 内容,则直接删除,重新生成
if (fs.existsSync(path.resolve(stylesPath, './components.scss'))) {
  fs.unlinkSync(path.resolve(stylesPath, './components.scss'));
}

//获取所有包含scss的文件夹
allComponents.map(component => path.join(componentsPath, `${component}/${component}.scss`))

let importStr = '';;
allComponents.forEach((item) => {
  importStr += `@import '../${item}/${item}.scss';\r\n`;
})
importStr += `\r\n`;

fs.writeFileSync(path.resolve(stylesPath, './index.scss'), importStr);