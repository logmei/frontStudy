const { SyncHook } = require('tapable')

const hook = new SyncHook(['name'])
// 注册事件 顺序执行跟返回值没关系
hook.tap('1',(name)=>{
  console.log(1,name)
})
hook.tap('2',(name)=>{
  console.log(2,name)
  return false
})
hook.tap('3',(name)=>{
  console.log(3,name)
})

hook.call('logmei')