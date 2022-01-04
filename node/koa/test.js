
const Koa = require('koa')

const app = new Koa()

app.use(async (ctx,next)=>{
  console.log('frist')
  await next()
  console.log('frist end')
})

// 异步中间件
app.use(async (ctx,next)=>{
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

app.use(async (ctx,next)=>{
  console.log('second')
  await next()
  console.log('second end')
})

app.use(async ctx=>{
  ctx.response.body = `<h1>Hello, koa2!</h1><script>console.log('user agent',navigator.userAgent)</script>`;
})

app.listen(3000,()=>{
  console.log('koa app listening on port 3000')
})