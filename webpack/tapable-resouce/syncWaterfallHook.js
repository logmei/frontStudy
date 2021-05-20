const { SyncWaterfallHook } = require('tapable')

// 将参数进行传递，第一个接收传过去的参数，后面的接收前一个函数返回的值作为参数

const hook = new SyncWaterfallHook(['name'])
// 注册事件
hook.tap('1',(name)=>{
  console.log(1,name)
  return name+'1'
})
hook.tap('2',(name)=>{
  console.log(2,name)
  return name+'2'
})
hook.tap('3',(name)=>{
  console.log(3,name)
})

hook.call('logmei')