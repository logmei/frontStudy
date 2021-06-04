var data = {
    name:'logmei',
    grade:{
        id:12
    }
}

function $set(key,value){
  defineReactive(obj,key,value)
}
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

observe(data)
console.log(data.name,data.grade)
data.dd = 1
data.name = 3
console.log(data.name,obj.dd)
$set('ddd',5)
console.log(data.ddd)
obj.ddd = 6
console.log(obj.ddd)
//依赖收集
class Dep{

}

//观察者
class Wacher{

}