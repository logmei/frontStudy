/**
 * Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，
 * 就返回那个结果，不管结果本身是成功状态还是失败状态。
 */
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
