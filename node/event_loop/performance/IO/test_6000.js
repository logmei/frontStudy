const http = require('http')

const server = http.createServer((req,res)=>{
  let sum = 500000000
  for(let i=500000000;i<1000000000;i++){
    sum +=i
  }
  res.write(`${sum}`) 
  res.end()
})

server.listen(6000,()=>{
  console.log('server start http://localhost:6000')
})