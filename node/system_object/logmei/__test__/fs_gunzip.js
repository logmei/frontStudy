// const fs = require('fs')
const fs = require('fs-extra')
const path = require('path')


try{
  const url = './logmei/__test__/fs.test.js'
  const dir = path.parse(url).dir.split(path.sep)
  existDir(dir)
  /**
   * r+ 打开文件用于读写。
    w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
    a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
    a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。
   */
  fs.open(url,'w+',(err)=>{
    if(err){
      console.error(err)
    }else{
      console.log('success')
    }
  })

  const stat = fs.statSync(url)
  console.log('stats',stat)
  // fs.rmdirSync('./liulei')// fs的删除带有内容的文件夹会报错
  fs.remove('./liulei') // 使用fs-extra的remove删除带有内容的文件夹比较容易
  // fs.renameSync('./logmei','./liulei')
  
}catch(e){
  console.error('catch',e)
}


function existDir(dir){
  console.log(dir)
  let newDir = ''
  for(let i = 0;i<dir.length;i++){
     newDir = i==0?dir[i]:path.join(newDir,dir[i])
    if(!fs.existsSync(newDir)){
        fs.mkdirSync(newDir)
    }
  }
}

function getFileName(name,dir){
  return path.format({
    dir,
    name,
    ext:'./test.js'
  })
}