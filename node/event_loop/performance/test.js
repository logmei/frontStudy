const http = require('http')

// 创建http服务并返回
const server = http.createServer((req,res)=>{
  res.write(`${startCount()+nextCount()}`)
  res.end();
})

function startCount(){
  let sum = 0 
  for(let i=0;i<500000000;i++){
    sum +=i
  }
  return sum
}

function nextCount(){
  let sum = 500000000 
  for(let i=500000000;i<1000000000;i++){
    sum +=i
  }
  return sum
}

// 启动服务
server.listen(4000,()=>{
  console.log('server start http://localhost:4000')
})

// 启动：node test.js
// 启动后，用另外的命令查看运行时间：time curl http://localhost:4000