
let p1 = new Promise((resolve)=>{
  setTimeout(()=>{
    resolve('success1')
  },1000)
 
})


let p3 = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject('失败')
  },2000)
  
})
Promise.race([p1,p3]).then(result=>{
  console.log('promise.race',result)
}).catch(error=>{
  console.log('promise.race error',error)
})
