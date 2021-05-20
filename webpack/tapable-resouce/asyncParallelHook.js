const { AsyncParallelHook } = require('tapable')

// 并行，再没有错误时，正常运行，一旦发现失败结束运行

const hook = new AsyncParallelHook(['name'])
console.time()
// 注册事件
/** tap方式注册事件
 * hook.tap('1',(name)=>{
  setTimeout(()=>{
    console.log(1,name)
  },2000)
 
})
hook.tap('2',(name)=>{
  setTimeout(()=>{
    console.log(2,name)
  },1000)
})
hook.tap('3',(name)=>{
  setTimeout(()=>{
    console.log(3,name)
  },3000)
})
hook.callAsync('logmei',()=>{
  console.log('over')
  console.timeEnd()
})
// 结果
over
default: 6.678ms
2 logmei
1 logmei
3 logmei

*/


/** tapAsync方式注册事件 
hook.tapAsync('1',(name,cb)=>{
  setTimeout(()=>{
    console.log(1,name)
    cb()
  },2000)
 
})
hook.tapAsync('2',(name,cb)=>{
  setTimeout(()=>{
    console.log(2,name)
    cb()
  },1000)
})
hook.tapAsync('3',(name,cb)=>{
  setTimeout(()=>{
    console.log(3,name)
    cb()
  },3000)
})


hook.callAsync('logmei',()=>{
  console.log('over')
  console.timeEnd()
})

// 运行结果
2 logmei
1 logmei
3 logmei
over
default: 3002.694ms
*/

hook.tapPromise('1',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(1,name)
      resolve(1+name)
    },2000)
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
2 logmei
rejected 1logmei
default: 1212.751ms
1 logmei
3 logmei
 */