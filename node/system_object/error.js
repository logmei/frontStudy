// 捕获未捕获的异常
process.on('uncaughtException',err=>{
  console.log('有一个未捕获的错误',err)
  process.exit(1) // 强制性退出
})