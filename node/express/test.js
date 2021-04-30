
const express = require('express')

const app = new express()

app.use(async (req,res,next)=>{
  console.log('frist')
  await next()
  console.log('frist end')
})

// 异步中间件
app.use(async (req,res,next)=>{
  console.log('async')
  await next()
  await new Promise((resolve)=>{
    setTimeout(()=>{
      console.log('wait 1000ms end')
      resolve()
    },1000)
    
  })
  console.log('async end')
})

app.use(async (req,res,next)=>{
  console.log('second')
  await next()
  console.log('second end')
})


app.listen(3000,()=>{
  console.log('express app listening on port 3000')
})

app.get('/',(req,res) => res.send('hello world'))