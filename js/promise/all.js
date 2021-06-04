/**
 * Promise.all可以将多个Promise实例包装成一个新的Promise实例。
 * 同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。
 */
let p1 = new Promise((resolve)=>resolve('success1'))

let p2 = Promise.reject('失败')

let p3 = new Promise((resolve)=>resolve('success2'))
Promise.all([p1,p3]).then(result=>{
  console.log('promise.all',result)
}).catch(error=>{
  console.log('promise.all error',error)
})

Promise.all([p1,p2,p3]).then(result=>{
  console.log('promise.all',result)
}).catch(error=>{
  console.log('promise.all error',error)
})