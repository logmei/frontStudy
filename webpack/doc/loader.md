### 自定义loader
#### 配置

##### 绝对路径配置loader
```
// webpack.config.js
{
  test: /\.js$/
  use: [
    {
      loader: path.resolve('loaders/myLoader1.js'),
      options: {name:'myLoader1'}
    },
     {
      loader: path.resolve('loaders/myLoader2.js'),
      options: {name:'myLoader2'}
    }
  ]
},
 {
  test: /\.less$/,
  use:[
    {
      loader:'style_loader'
    },
    {
      loader:'less_loader'
    }
  ]
}
```
##### 使用resolveLoader.modules配置，进行自动搜索
```
// webpack.config.js
resolveLoader: {
  modules: [
    'node_modules',
    path.resolve(__dirname, 'loaders')
  ]
}
```

#### 编写用法
* loader是一个函数，会通过loader runner进行调用，函数内通过this调用loader API,因此loader函数不能使用箭头函数
* loader接收的参数有三个：source(资源文件的内容)，map(sourcemap),meta(抽象语法树ast)
* 必须有返回值，或调用callback返回值

##### 简单示例
```
module.exports = function(source,map,meta){
  console.log(source,this.query)
  this.callback(null,source,map,meta)
  // return source
}
/**
输出：

import b from './b.js';
export default 'aaaaa'+b { name: 'myloader2' }
import b from './b.js';
export default 'aaaaa'+b { name: 'myloader1' }
import c from './c.js';
export default 'bbbbbbb'+c; { name: 'myloader2' }
import c from './c.js';
export default 'bbbbbbb'+c; { name: 'myloader1' }
export default 'cccccccccccccc'; { name: 'myloader2' }
export default 'cccccccccccccc'; { name: 'myloader1' }
*/
```

#### less_loader示例
`注意：先安装less`
```
var less = require('less')
module.exports = function(source){
  var callback = this.async();
  less.render(source).then(function(output){
    // console.log('less------------',output.css)
    callback(null,JSON.stringify(output.css),output.map)
  })
  
}
```
#### style_loader示例
```
module.exports = function(source){
  return `
  ;(function(){
    var head = document.createElement('style');
    head.innerHTML = ${source}
    document.getElementsByTagName('head')[0].appendChild(head)
    })();
  `
}
```
#### 参考文献
https://www.webpackjs.com/contribute/writing-a-loader/#%E8%AE%BE%E7%BD%AE
https://www.webpackjs.com/api/loaders/#%E7%A4%BA%E4%BE%8B
https://less.bootcss.com/usage/#programmatic-usage
