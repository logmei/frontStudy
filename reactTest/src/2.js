// babel将jsx转换成语法树

// @babel/core是babel的核心包,是个引擎
const babel = require('@babel/core')
const sourceCode = `<h1>hello world</h1>`
// 使用babel.transform，配置转换插件进行转换
const result = babel.transform(sourceCode,{
  plugins:[["@babel/plugin-transform-react-jsx",{runtime:'classic'}]]
})

console.log(result)