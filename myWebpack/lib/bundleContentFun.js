module.exports = (modules)=>{
  const newModules = modules.reduce((lastModule,curr)=>{
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
}