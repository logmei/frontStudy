const http = require('http')

const server = http.createServer((req,res)=>{
  let sum = 0 
  for(let i=0;i<500000000;i++){
    sum +=i
  }
  res.write(`${sum}`) 
  res.end()
})

server.listen(5000,()=>{
  console.log('server start http://localhost:5000')
})