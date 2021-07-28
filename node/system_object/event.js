const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start',(params)=>{
  console.log('start',params)
})

eventEmitter.emit('start',123)