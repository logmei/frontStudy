

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







Function.prototype.myCall = function(obj,...rest){
  if(typeof this !== 'function') throw new Error('not a function')
  const context = obj || window
  context.fn = this
  const result = context.fn(...rest) 
  delete context.fn
  return result
}

Function.prototype.myApply = function(obj,rest){
  if(typeof this !== 'function') throw new Error('not a function')
  const context = obj || window
  context.fn = this
  let result = null
  if(Array.isArray(rest) && rest.length>0){
    result = context.fn(...rest) 
  } else {
    result = context.fn() 
  }
  
  delete context.fn
  return result
}

Function.prototype.myBind = function(obj,...rest){
  if(typeof this!=='function') throw new Error('not a function')
  const context = obj || window
  const that = this
  
  return function F(...rest1){
    if(this instanceof F){
      return new F(...rest1,...rest)
    }else{
      context.fn = that
      const result = context.fn(...rest1,...rest)
      delete context.fn
      return result
    }
  }
}

function MyNew(){
  const obj = {}
  const constructor = [].shift.call(arguments)
  if(typeof constructor!== 'function') throw new Error('not function')
  Object.setPrototypeOf(obj,constructor.prototype)
  const result = constructor.call(obj,...arguments)
  return result instanceof Object?result:obj
}

function myInstanceOf(left,right){
  let leftPro = left.__proto__
  let rightPro = right.prototype

  while(leftPro){
    if(leftPro === rightPro) return true
    if(leftPro === null) return false
    leftPro = leftPro.__proto__
  }
  return false
}
const ss={
  grade:'sssssss'
}
function a(name,sex){
  console.log('myCall',this.grade,JSON.stringify(arguments))
}
a.myCall(ss,'logmei','1')
a.myApply(ss,['logmei','1'])
a.myBind(ss,'logmei','2')(2,3)

const aa = MyNew(a)

const isInstance = myInstanceOf(student,Student)
console.log('isInstance',isInstance)


 // wait单位为毫秒
 function debounce(fn,wait,isImmediately=false){
  if(typeof fn !== 'function') throw new Error('第一个参数不是函数')
  let immediate = isImmediately
  let lastTime = new Date()
  return (...rest)=>{
    // 立即执行
    if(immediate){
      fn(...rest)
      immediate = false
      lastTime = new Date()
      return
    } 
    const nowTime = new Date()
    if(nowTime.getTime() - lastTime.getTime() >= wait){
      fn(...rest)
    } 
    lastTime = nowTime
    
  }
}
// wait单位为毫秒
function debounce_1(fn,wait,isImmediately=false){
  if(typeof fn !== 'function') throw new Error('第一个参数不是函数')
  let immediate = isImmediately
  let lastTime = null
  return (...rest)=>{
    if(lastTime === null){
      // 立即执行
      if(immediate){
        fn(...rest)
        immediate = false
      } 
      lastTime = new Date()
    }else{
      const nowTime = new Date()
      if(nowTime.getTime() - lastTime.getTime() >= wait){
        fn(...rest)
      } 
      lastTime = nowTime
    }
  }
}

function throttle(fn,wait,isImmediately){
  let immediately = isImmediately
  let timer = null

 
  return (...rest)=>{
    const timerFun = (params)=>{
      timer = setTimeout((imme)=>{
        if(!imme)fn.apply(this,params)
        timer = null
        window.clearTimeout()
      },wait,immediately)
    }
    if(immediately){
      fn.apply(this,rest)
      timerFun(rest)
      immediately = false
    }else{
      if(timer === null){
        timerFun(rest)
      }
    }
  }
}