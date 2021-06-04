
var data = {
  name:'logmei',
  grade:{
      id:12
  }
}

var arr = {a:[2,3],b:[{c:'23'}]}

function proxyReactive(data){
  if(typeof data !== 'object') return data
  return new Proxy(data,{
    get:(target,key,reciver)=>{
      console.log('get',key)
      return proxyReactive(target[key])
    },
    set:(target,key,value,reciver)=>{
      console.log('set',key,value)
        return Reflect.set(target,key,value,reciver)
     
    }
  })
}
const proxy = proxyReactive(data)

console.log(proxy.name,proxy.grade,proxy.grade.id)
proxy.name='lll'
proxy.dd='22'
console.log(proxy.dd)

const proxyArr = proxyReactive(arr)
console.log(proxyArr.a)
proxyArr.c={e:6}
console.log(proxyArr.b)
console.log(proxyArr.c)