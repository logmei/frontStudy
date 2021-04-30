const http = require('http')

const server = http.createServer((req,res)=>{
  res.write(`hello world,start with cluster ${process.pid}`)
  res.end()
})

server.listen(3000,()=>{
  console.log('cluster start server http://localhost:3000')
})

console.log(`Worker ${process.pid} started`);