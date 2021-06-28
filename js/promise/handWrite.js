

class MyPromise{
  promiseState = 'pedding';// fulfilled,rejected
  promiseResult = null;
  fulfilledCbs = []
  rejectedCbs = []

  constructor(fn){
    if(typeof fn !== 'function') throw new Error('params must be a function')
    try{
      fn(this.resolve.bind(this),this.reject.bind(this))
    }catch(e){
      this.reject(e)
    }
  }

  resolve(res){
    if(this.promiseState === 'pedding'){
      this.promiseResult = res
      this.promiseState = 'fulfilled'
      this.fulfilledCbs.forEach(cb=>cb(this.promiseResult))
    }
  }

  reject(res){
    if(this.promiseState === 'pedding'){
      this.promiseState = 'rejected'
      this.promiseResult = res
      this.rejectedCbs.forEach(cb=>cb(this.promiseResult))
    }
  }

  then(resolveCb,rejectCb){
    resolveCb = typeof resolveCb === 'function' || resolveCb instanceof MyPromise?resolveCb:v=>v
    rejectCb = typeof rejectCb === 'function' || rejectCb instanceof MyPromise? rejectCb:v=>{throw new Error(v)}
    const that = this
    const retPromise = new MyPromise((resolve,reject)=>{

      const excutor = (cb)=>{
        setTimeout(()=>{
          const x = cb(that.promiseResult)
          if(x === retPromise) reject('not self')
          if(x instanceof MyPromise){
            x.then(resolve.bind(this,that.promiseResult))
          }else{
            resolve(x)
          }
        })
       
      }

      if(that.promiseState === 'pedding'){
        that.fulfilledCbs.push(()=>excutor(resolveCb))
        that.rejectedCbs.push(()=>excutor(rejectCb))
      }
  
      if(that.promiseState === 'fulfilled'){
        excutor(resolveCb)
      }
  
      if(that.promiseState === 'rejected'){
        excutor(rejectCb)
      }
    })
    return retPromise
  }


}