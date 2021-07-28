const http = require('http')
const options = {
  hostname:'127.0.0.1',
  port:3000,
  path:'/',
  method:'GET'
}

const req = http.request(options,res=>{
  console.log('状态码',res.statusCode)
  res.on('data',d=>{
    process.stdout.write(d)
  })
})

req.on('error',err=>{
  console.error(err)
})

req.end()