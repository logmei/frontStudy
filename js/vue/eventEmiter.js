const EventEmiter = function(){
    this._events = {}
}

EventEmiter.prototype.on = function(event,cb){
    if(Array.isArray(event)){
        event.forEach(e=>{
            this.on(e,cb)
        })
    } else {
        if(!this._events[event]) this._events[event] = []
        this._events[event].push(cb)
    }
    return this
}

EventEmiter.prototype.once = function(event,cb){
    function oneTime(){
        cb.apply(this,arguments)
        this.off(event,cb)
    }
    oneTime.fn = cb
    this.on(e,oneTime)
}

EventEmiter.prototype.off = function(event,cb){
    //若没有传参，删除所有
    if(!arguments.length) this._events = Object.create(null)
    //若event为数组，删除下面所有的回调
    if(Array.isArray(event)) {
        event.forEach(e=>{
            this.off(e,cb)
        })
    }
    //若传了event,没有cb,则删除event下所有回调
    if(event && !cb){
        this._events[event] = null
    }

    if(event && cb){
        let cbs = this._events[event]
        cbs.forEach((c,i)=>{
            if(c === cb || c.fn === cb){
                cbs.splice(i,1)
                break
            }
        })
    }

}


EventEmiter.prototype.emit = function(event,...args){
    let cbs = this._events[event]
    if(cbs){
        cbs.forEach(cb=>{
            cb.apply(this,args)
        })
    }
}