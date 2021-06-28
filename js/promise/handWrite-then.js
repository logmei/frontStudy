
const PENDING = 'pending',FULFILLED = 'fulfilled',REJECTED = 'rejected'
class MyPromise{
  promiseResult = null;
  promiseState = PENDING;
  fulfilledCbs = []
  rejectedCbs = []

  constructor(fn){
    try{
      fn(this.resolve,this.reject)
    }catch(e){
      this.reject(e)
    }
  }

  resolve=(res)=>{
    if(res instanceof MyPromise){
      res.then(this.resolve,this.reject)
    }
    // 为了保证执行顺序，需要将两个函数体代码使用setTimeout包裹起来
    setTimeout(()=>{
      if(this.promiseState === PENDING){
        this.promiseResult = res
        this.promiseState = FULFILLED
        this.fulfilledCbs.map(cb=>cb(this.promiseResult))
      }
    },0)
   
  }

  reject = (res)=>{
    setTimeout(()=>{
      if(this.promiseState === PENDING){
        this.promiseState = REJECTED
        this.promiseResult = res
        this.rejectedCbs.map(cb=>cb(this.promiseResult))
      }
    })
    
  }

  then = (resolveCb,rejectCb)=>{
    resolveCb = typeof resolveCb === 'function'?resolveCb:v=>v
    rejectCb = typeof rejectCb === 'function'? rejectCb: e=> {throw new Error(e)}
   
   
    const that = this
    const thenPromise = new MyPromise((resolve,reject)=>{
      const excutorFn = cb=>{
        setTimeout(()=>{
          const x = cb(that.promiseResult)
          if(x === thenPromise) throw new Error('canot self')
          if(x instanceof MyPromise){
            x.then(resolve)
          }else{
            resolve(x)
          }
        },100)
       
       }
      if(that.promiseState === FULFILLED){
        excutorFn(resolveCb)
      }
      if(that.promiseState === REJECTED){
        excutorFn(rejectCb)
      }
      
    if(that.promiseState === PENDING){
      that.fulfilledCbs.push(()=>excutorFn(resolveCb))
      that.rejectedCbs.push(()=>excutorFn(rejectCb))
    }
   
    })
    return thenPromise
  }
}