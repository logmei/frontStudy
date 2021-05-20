const { AsyncSeriesHook } = require('tapable')
// 串行hook   发现错误，都返回失败
const hook = new AsyncSeriesHook(['name'])
console.time()

hook.tapPromise('1',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(1,name)
      resolve(1+name)
    },2000)
    /**
     * 
    setTimeout(()=>{
      reject(1+name)
    },1200)

    运行结果：
    rejected 1logmei
    default: 1216.121ms
    1 logmei
     * 
     */
    setTimeout(()=>{
      reject(1+name)
    },1200)
  })
})

hook.tapPromise('2',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(2,name)
      resolve(2+name)
    },1000)
  })
})

hook.tapPromise('3',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(3,name)
      resolve(3+name)
    },3000)
  })
})

hook.promise('logmei').then(res=>{
  console.log('fullfilled',res)
  console.timeEnd()
},err=>{
  console.log('rejected',err)
  console.timeEnd()
})

/**
 * 结果：
 * 
1 logmei
2 logmei
3 logmei
fullfilled undefined
default: 6023.392ms
 */