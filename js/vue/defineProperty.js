var data = {
    name:'logmei',
    grade:{
        id:12
    }
}
observe(data)

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
  Object.defineProperty(obj,key,{
      enumerable:true,//可枚举
      configurable:true,//可修改
      get:function(){
          console.log('调用',val)
          return val
      },
      set:function(v){
        let oldValue = v
        console.log(`修改值，oldValue=${oldValue},newValue=${val}`)
        val = v
      }

  })
}
//依赖收集
class Dep{

}

//观察者
class Wacher{

}