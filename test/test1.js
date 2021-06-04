
var obj = {a:1,b:{c:1}}

const Dep = []

function $set(key,value){
  defineReactive(obj,key,value)
}

function observe(obj){
  if(typeof obj!=='object') return 
  Object.keys(obj).forEach(key=>{
    defineReactive(obj,key,obj[key])
  })
}

function defineReactive(obj,key,val){
  observe(val)
  console.log('defineReactive')
  Object.defineProperty(obj,key,{
    get:()=>{
      console.log('get ',key)
      return val
    },
    set:(v)=>{
      console.log('set ',key,val)
      Dep.push()
      val = v
    }
  })
}

observe(obj)
console.log(obj.a,obj.b)
obj.dd = 1
obj.a = 3
console.log(obj.a,obj.dd)
$set('ddd',5)
console.log(obj.ddd)
obj.ddd = 6
console.log(obj.ddd)