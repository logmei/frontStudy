## 手写webpack
### 通过fs读写文件:
 ```
  const content = fs.readFileSync(this.entry,'utf-8')
  fs.writeFileSync(this.outputFile,content,'utf-8')
 ```
### 通过'@babel/core'对文件进行解析
  #### 读取依赖和内容(定义complier方法)
  * babel.parseSync:可以将内容转换为抽象语法树（本质是用的@babel/parser）
  ```
    var babel = require('@babel/core')
    const parseAst = babel.parseSync(content,{sourceType:'module'}) 
    console.log(parseAst.program.body)
    /*
    [
      Node {
        type: 'ImportDeclaration',// 引用
        start: 0,
        end: 23,
        loc: SourceLocation {
          start: [Position],
          end: [Position],
          filename: undefined,
          identifierName: undefined
        },
        specifiers: [ [Node] ],
        source: Node {
          type: 'StringLiteral',
          start: 14,
          end: 22,
          loc: [SourceLocation],
          extra: [Object],
          value: './b.js' // 引用地址
        }
      },
      Node {
        type: 'ExportDefaultDeclaration', // 输出
        start: 24,
        end: 48,
        loc: SourceLocation {
          start: [Position],
          end: [Position],
          filename: undefined,
          identifierName: undefined
        },
        declaration: Node {
          type: 'BinaryExpression',
          start: 39,
          end: 48,
          loc: [SourceLocation],
          left: [Node],
          operator: '+',
          right: [Node]
        }
      }
    ]
    */
  ```
  * babel.transformFromAstSync:将内容转浏览器能识别的代码
  ```
   var babel = require('@babel/core')
   const transformContent = babel.transformFromAstAsync(parseAst,null,{presets:["@babel/preset-env"]}).then(res=>{
      console.log(res)
    })
    /**
    code: '"use strict";\n' +
    '\n' +
    'Object.defineProperty(exports, "__esModule", {\n' +
    '  value: true\n' +
    '});\n' +
    'exports["default"] = void 0;\n' +
    '\n' +
    'var _b = _interopRequireDefault(require("./b.js"));\n' +
    '\n' +
    'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
    '\n' +
    `var _default = 'aaaaa' + _b["default"];\n` +
    '\n' +
    'exports["default"] = _default;',
    map: null,
    */
  ```
  * 读取依赖文件：可以解析parse出来的内容，也可以使用@babel/traverse
  `注意：使用新版本traverse时，引入需要用default;(const traverse = require('@babel/traverse').default)`
  
#### 获取模块数据
> 通过以上操作获取模块数据
```
  {
    filepath: './src/index.js',
    dependencies: { './b.js': './src/b.js' },
    code: '"use strict";\n' +
      '\n' +
      'Object.defineProperty(exports, "__esModule", {\n' +
      '  value: true\n' +
      '});\n' +
      'exports["default"] = void 0;\n' +
      '\n' +
      'var _b = _interopRequireDefault(require("./b.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }\n' +
      '\n' +
      `var _default = 'aaaaa' + _b["default"];\n` +
      '\n' +
      'exports["default"] = _default;'
  }
```

### 递归获取所有依赖文件内容
> 将所有依赖的文件不断插了modules，实现递归
```
 const module = this.complier(this.entry)
    this.modules.push(module)
    for(let i=0;i<this.modules.length;i++){
      Object.entries(this.modules[i].dependencies).forEach(dep=>{
        this.modules.push(this.complier(dep[1]))
      })
    }
```

#### 生成bundle需要的modules
```
  const newModules = this.modules.reduce((lastModule,curr)=>{
      return {...lastModule,[curr.filepath]:curr}
    },{})
```


### 生成bundle文件
> 通过transform生成的code中含有require和exports
#### 定义require函数返回结果
```
 function require(moduleId){
    // 1、定义exports
    var exports = {}
    // 2、运行代码
    eval(modules[moduleId].code)
    // 3、返回运行结果
    return exports
  }
```
#### bundle文件内容
```
const newModules = this.modules.reduce((lastModule,curr)=>{
      return {...lastModule,[curr.filepath]:curr}
    },{})
    let exefun = '('
    exefun += `function(modules){
     
      var __myWebpack_exports_cache = {}

      var executeCode = (require,exports,code)=>{
        eval(code)
      }
      
      // 运行依赖文件的代码通过module.exports返回
      function require(moduleId){
        // 将相对路径改为觉得路径
        function reRequire(path){
          var newPath = modules[moduleId].dependencies[path] 
          if(newPath){
            return require(modules[moduleId].dependencies[path])
          } else {
            return ()=>{}
          }
          
        }
        //1、查询是否在缓存中
        var cacheExports = __myWebpack_exports_cache[moduleId]
        if(cacheExports){
          return cacheExports;
        }
        console.log('require'+moduleId)
        // 2、定义exports
        var exports = (
          __myWebpack_exports_cache[moduleId] = {}
        )
        // 3、运行代码
        executeCode(reRequire,exports,modules[moduleId].code)
        // 4、返回运行结果
        return exports
      }
      require("./src/index.js")
    }
    
    )(${JSON.stringify(newModules)})`
```