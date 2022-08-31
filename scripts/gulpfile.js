const { series, src, dest, task } = require("gulp");
const sass = require('git config –get core.ignorecase)(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const allComponents = require("./components");

// task('sass', function() {
//   return src('./*.scss')
//     .pipe(sass.sync())
//     .pipe(autoprefixer({
//       browsers: ['last 2 versions'],
//       cascade: false
//     }))
//     .pipe(cssmin())
//     .pipe(dest('./lib'));
// })

//单个组件打包样式
allComponents.forEach((component) => {
  task(component + 'Sass', function () {
    return src(`../components/${component}/style/index.scss`)
      .pipe(rename((path) => {
        path.basename = component
      }))
      .pipe(sass.sync())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(cssmin())
      .pipe(dest('../lib/theme'));
  })
})

task('font', function () {
  return src("../components/styles/fonts/**")
    .pipe(cssmin())
    .pipe(dest('../lib/theme/fonts'));
})

const allComponentsSass = allComponents.map((item) => `${item}Sass`);

exports.build = series(['font', ...allComponentsSass]);