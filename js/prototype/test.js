var a = {b:'1',c:{f:[{w:1,s:4},2,45]},d:Symbol.for('lll')}
var b = JSON.parse(JSON.stringify(a))

function deepCopy(a){
  if(typeof a !== 'object') return a
  let newObj = Array.isArray(a)?[]:{}
  Object.keys(a).forEach(key=>{
    newObj[key] = deepCopy(a[key])
  })
  return newObj
}

// 继承
function Parent(name){
  this.name = name
  this.xing = 'li'
}

function Son(name){
  Parent.call(this,name)
}
//es6用法
// Object.setPrototypeOf(Son.prototype,Parent.prototype)
// es5用法 用Object.create创建
Object.defineProperty(Son,'prototype',{
  value:Object.create(Parent.prototype,{
    constructor:{
      value: Son,
      configurable: false,
    }
  }),
  configurable:false,
  enumerable:false,
  writable:false
})
const son = new Son('logmei')

