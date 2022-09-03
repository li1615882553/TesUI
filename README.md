# TesUI
基于上面的组件实现，搭建了一套UI控件
## 准备工作
### tsx编译
因为项目使用tsx搭建,所以需要解决由tsx到js的编译过程,首先`@babel/preset-react`会将tsx文件中关于`HTML`部分代码转换为`React.createElement`,我们手动将其转换成`createElement`,然后通过编写`babel`插件`src/plugins/transform-jsx`将其引入所有文件,这样就完成了`tsx`到`js`的编译
### example测试文件
`example`是使用`express`+`webpack`搭建的多页面测试应用,内部暂时是对`ui`组件的演示测试文件