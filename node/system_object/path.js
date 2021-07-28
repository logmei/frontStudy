// path 路径  区分大小写
const path = require("path")

// 1、basename使用
const baseName = path.basename('../text.conf')
console.log(baseName) // 输出：text.conf
const baseName1 = path.basename('../text.conf','.conf')
console.log(baseName1) // 输出：test

// 2、delimiter分隔符
console.log('env.path',process.env.PATH)
console.log(process.env.PATH.split(path.delimiter))

// 3、dirname 返回目录名
console.log('dirname',path.dirname('../text.conf'))
console.log('extname',path.extname('../text.conf'))
const formatStr = path.format({
  root:'/logmei',
  dir:'/home/user/dir',
  base:'file.txt'
})
console.log('format',formatStr)
console.log('parse',path.parse(formatStr))
console.log('path rsolve',path.resolve('.'))