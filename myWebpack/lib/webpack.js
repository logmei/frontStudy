var fs = require('fs')
var path = require('path')
var babel = require('@babel/core')
var traverse = require('@babel/traverse').default

class myWebpack{
  constructor(options){
    this.entry = options.entry;
    this.outputFile = path.join(options.output.path,options.output.filename)
    this.modules = []
  }

  init(){
    const module = this.complier(this.entry)
    this.modules.push(module)
    for(let i=0;i<this.modules.length;i++){
      Object.entries(this.modules[i].dependencies).forEach(dep=>{
        this.modules.push(this.complier(dep[1]))
      })
    }
    // console.log(this.modules)
    this.createBundleFile()
  }

  complier(filepath){
    const content = fs.readFileSync(filepath,'utf-8')
    const parseAst = babel.parseSync(content,{sourceType:'module'}) 
    // 依赖关系
    let dependencies = {} 
    // console.log(parseAst.program.body)
    // traverse(parseAst,{
    //   ImportDeclaration(v){
    //     const modulePath = path.resolve(path.dirname(this.entry),v.source.value);
    //     dependencies[v.node.source.value] = modulePath
    //   }
    // })
    parseAst.program.body.forEach(v=>{
      if(v.type === 'ImportDeclaration'){
        const modulePath = path.resolve(path.dirname(this.entry),v.source.value);
        dependencies[v.source.value] = modulePath
      }
    })
    // console.log(dependencies)
    const { code } = babel.transformFromAstSync(parseAst,null,{presets:["@babel/preset-env"]})
    return {
      filepath,
      dependencies,
      code
    }
  }

  createBundleFile(){
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
        // 将相对路径改为绝对路径
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
    console.log(this.modules)
    fs.writeFileSync(this.outputFile,exefun,'utf-8')
  }

}
module.exports = myWebpack
