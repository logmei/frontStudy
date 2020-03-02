
//依赖收集
class Dep{
    constructor(){
        this.watchers = []
    }
    addWatcher(watcher){
        this.watchers.push(watcher)
    }
    notify(){
        this.watchers.forEach(watcher =>{
            watcher.update()
        })
    }
  }
  
  //观察者
  class Watcher{
    constructor(obj,key,callback){
        Dep.target = this
        this.obj = obj
        this.key = key
        //执行调用 进行依赖收集
        this.value = obj[key]
        Dep.target = null
        this.callback = callback
    }
  
    update(){
        this.callback(this.value)
    }
  
  
  }

var data = {
    name:'logmei',
    grade:{
        id:12
    }
}
observe(data)

new Watcher(data,'name',(value)=>{
    console.log('watcher.........',value)
})


data.name = '22222222222222'

//监听数据
function observe(data){
    if(typeof data !== 'object') return
    Object.keys(data).forEach(key=>{
        definereactive(data,key,data[key])
    })
}

//做数据代理
function definereactive(obj,key,val){
    observe(val)
    let dep = new Dep()
  Object.defineProperty(obj,key,{
      enumerable:true,//可枚举
      configurable:true,//可修改
      get:function(){
          console.log('调用',val)
         if(Dep.target) dep.addWatcher(Dep.target)
          return val
      },
      set:function(v){
        let oldValue = v
        dep.notify()
        console.log(`修改值，oldValue=${oldValue},newValue=${val}`)

        val = v
      }

  })
}