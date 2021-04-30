const http = require('http')
const rp = require('request-promise')

//创建http服务并返回
const server = http.createServer((req,res)=>{
  Promise.all([startCount(),nextCount()]).then((values)=>{
    let sum = values.reduce((prev,curr)=>{
      return parseInt(prev)+parseInt(curr)
    },0)

    res.write(`${sum}`)
    res.end()
  })
})

async function startCount(){
  return await rp.get('http://127.0.0.1:5000')
}

async function nextCount(){
  return await rp.get('http://127.0.0.1:6000')
}

server.listen(4000,()=>{
  console.log('server start http://127.0.0.1:4000')
})

/**
 * 异步网络I/O
 * 
 * 对比主流程执行，优化的思想是将上面的两个计算函数分别交由其他两个进程来处理，
 * 然后主进程应用异步网络I/O的方式来调用执行
 */

/**
 * promise.all
 * 
 * 接收的参数是promise的iterable类型（注：Map,Array,Set都属于iterable类型），并且只返回一个promise实例，
 * 那个输入的所有promise的resolve回调的结果是一个数组。
 * 返回的这个promise的resolve执行是所有输入的promise的resolve执行结束，或输入的里面没有promise的时候，
 * reject执行是，只要任何一个promise的reject回调函数执行或者不合法的promise就会立即抛出异常，并且reject的
 * 是第一个抛出错误信息的
 */