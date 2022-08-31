const path = require("path");
const fs = require("fs");
const componentsPath = path.resolve(__dirname, "../components/");
const stylesPath = path.resolve(__dirname, "../components/styles");
const allComponents = require("./components");
let scssFiles = [];

//如果存在 theme.index.scss 内容,则直接删除,重新生成
if (fs.existsSync(path.resolve(stylesPath, './components.scss'))) {
  fs.unlinkSync(path.resolve(stylesPath, './components.scss'));
}

//获取所有包含scss的文件夹
allComponents.forEach(component => {
  let stats = fs.statSync(path.join(componentsPath, component, "style/index.scss"));
  if(stats.isFile()){
    scssFiles.push(`../${component}/style/index.scss`)
  }
})

let importStr = '';;
scssFiles.forEach((item) => {
  importStr += `@import '${item}';\r\n`;
})
importStr += `\r\n`;

fs.writeFileSync(path.resolve(stylesPath, './components.scss'), importStr);