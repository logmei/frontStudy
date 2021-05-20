const { SyncLoopHook } = require('tapable')
// 循环执行返回不为undeined的函数，当返回undefined时结束
// 注册数组时先循环第一个，第一个完成之后循环第二个，循环第二个时注册的第一个会继续执行直到第二个循环完成，以此类推
const hook = new SyncLoopHook(['name'])
let count = 3
let count1 = 3
let count2 = 3
// 注册事件
hook.tap('1',(name)=>{
  const newC = --count
  console.log(1,name,newC)
  return newC<0?undefined:'1-'+name+newC
})
hook.tap('2',(name)=>{
  const newC = --count1
  console.log(2,name,newC)
  return newC<0?undefined:'2-'+name+newC
})
hook.tap('3',(name)=>{
  const newC = --count2
  console.log(3,name,newC)
  return newC<0?undefined:'3-'+name+newC
})

hook.call('logmei')