const fs = require('fs')
const zlib = require('zlib')

const writeStream = fs.createWriteStream('./logmei/__test__/fs.test.js')
// writeStream.write('你好！ world','UTF-8')
// writeStream.end()
// writeStream.on('finish',()=>{
//   console.log('写入完成')
// })

let data = ''
const readStream = fs.createReadStream('./fs.js')
// readStream.setEncoding('utf-8')
// readStream.on('data',(chunk)=>{
//   data+=chunk
// })

// readStream.on('end',()=>{
//   console.log('read:',data)
// })
// readStream.on('error',(err)=>{
//   console.log(err)
// })

//管道流  实现读写
readStream.pipe(writeStream)

// 链式流
// fs.createReadStream('./fs.js').pipe(zlib.createGzip()).pipe(fs.createWriteStream('./logmei/__test__/fs.test.gz'))
fs.createReadStream('./logmei/__test__/fs.test.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('./logmei/__test__/fs_gunzip.js'))