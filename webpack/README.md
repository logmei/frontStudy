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
#### 参考文献
https://www.webpackjs.com/contribute/writing-a-loader/#%E8%AE%BE%E7%BD%AE
https://www.webpackjs.com/api/loaders/#%E7%A4%BA%E4%BE%8B

### Tapable
> Tapable是webpack的核心工具,很多对象都扩展自Tapable类

> 利用new Function(参数,函数体内容)来创建函数 
#### 安装tapable
> npm i tapable -S
#### tapable介绍
* SyncHook:同步钩子
* SyncBailHook:
* SyncWaterfallHook
* SyncLoopHook
* AsyncParalleHook
* AsyncParallBailHook
* AsyncSeriesHook
* AsyncSeriesBailHook
* AsyncSeriesWaterfallHook


