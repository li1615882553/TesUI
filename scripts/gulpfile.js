const { series, src, dest, task } = require("gulp");
const sass = require('gulp-sass')(require('node-sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const allComponents = require("./components");


//单个组件打包样式
allComponents.forEach((component) => {
  task(component + 'Sass', function () {
    return src(`../components/${component}/${component}.scss`)
      .pipe(sass.sync())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(cssmin())
      .pipe(dest('../lib/theme'));
  })
})

//整体样式打包
task("indexSass", function () {
  return src(`../components/styles/index.scss`)
  .pipe(sass.sync())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cssmin())
  .pipe(dest('../lib/theme'));
})

task('font', function () {
  return src("../components/styles/fonts/**")
    .pipe(cssmin())
    .pipe(dest('../lib/theme/fonts'));
})

const allComponentsSass = allComponents.map((item) => `${item}Sass`);

exports.build = series(['font', 'indexSass', ...allComponentsSass]);