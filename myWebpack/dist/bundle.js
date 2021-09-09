(function(modules){
     
      var __myWebpack_exports_cache = {}

      var executeCode = (require,exports,code)=>{
        
        eval(code)
      }

      
      
      // 运行依赖文件的代码通过module.exports返回
      function require(moduleId){
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
    
    )({"./src/index.js":{"filepath":"./src/index.js","dependencies":{"./b.js":"./src/b.js","./d.js":"./src/d.js"},"code":"\"use strict\";\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nvar _d = _interopRequireDefault(require(\"./d.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log('aaaaa' + _b[\"default\"] + _d[\"default\"]);"},"./src/b.js":{"filepath":"./src/b.js","dependencies":{"./c.js":"./src/c.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _c = _interopRequireDefault(require(\"./c.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = 'bbbbbbb' + _c[\"default\"];\n\nexports[\"default\"] = _default;"},"./src/d.js":{"filepath":"./src/d.js","dependencies":{"./c.js":"./src/c.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _c = _interopRequireDefault(require(\"./c.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = 'dddddddddd' + _c[\"default\"];\n\nexports[\"default\"] = _default;"},"./src/c.js":{"filepath":"./src/c.js","dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = 'cccccccccccccc';\nexports[\"default\"] = _default;"}})