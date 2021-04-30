const cluster = require('cluster')

const instances = 2

if(cluster.isMaster){// 判断是否为主进程
  for(let i = 0;i<instances;i++){
    cluster.fork() // 创建子进程
  }
}else{
  require('./app.js')
}