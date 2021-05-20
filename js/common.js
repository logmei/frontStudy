function MyNew(){
  
  // 创建新的对象 字面量对象
  const obj = {}
  // console.log('MyNew arguments',arguments)
  // 获取构造方法 利用数组的shift取出第一个参数
  const Con = [].shift.call(arguments)
  if(typeof Con !=='function') return {}
  // console.log('MyNew obj1',obj)
  // 设置__proto__
  obj.__proto__ = Con.prototype
  // console.log('MyNew obj2',obj)
  // 调用构造方法，返回结果，使用新的对象指定this
  const result = Con.apply(obj,arguments)
  // console.log('MyNew result',result)
  // 如果是对象返回自己否则返回obj
  return typeof result === 'object'?result:obj

}


function Student(name){
  this.name = name
  // return 'test'
}

const student = MyNew(Student,'student')
console.log('mynew',student)





function MyInstanceOf(left,right){
  if(!left || !right) return false
  let leftP = left.__proto__
  let rightP = right.prototype
  while(true){
    if(leftP===rightP) return true
    if(leftP === null) return false
    leftP = rightP.__proto__
  }
}

const isInstance = MyInstanceOf(student,Student)
console.log('isInstance',isInstance)
