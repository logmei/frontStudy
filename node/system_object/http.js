const http = require('http')
const fs = require('fs')
const server = http.createServer((req,res)=>{
  res.statusCode = 200
  res.setHeader('content-type','text/plain')
  // 读取文件的全部内容，并完成时调用回调函数，如果文件过大会花费较多的时间
  // fs.readFile('./fs.js',(err,data)=>{
  //   res.end(data)
  // })
  //改进：当要发生的数据块已获得时就立即开始讲其流式传输到http客户端，而不是等待直到文件被完全读取
  const stream = fs.createReadStream('./fs.js')
  stream.pipe(res)
})

server.listen(3000,()=>{
  console.log('')
})