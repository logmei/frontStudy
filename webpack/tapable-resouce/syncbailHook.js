const { SyncBailHook } = require('tapable')
// 保险丝hook，只要存在返回值则终端

const hook = new SyncBailHook(['name'])
// 注册事件
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