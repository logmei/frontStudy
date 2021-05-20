
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