var fs = require('fs')
var path = require('path')
var babel = require('@babel/core')
// var traverse = require('@babel/traverse').default
var BundleContentFun = require('./bundleContentFun.js')

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
    BundleContentFun(this.modules)
    console.log(this.modules)
    fs.writeFileSync(this.outputFile,exefun,'utf-8')
  }

}
module.exports = myWebpack
