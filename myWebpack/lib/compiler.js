const {
  AsyncSeriesHook
} = require('tapable')
class Compiler{
  constructor(){
    this.hooks = Object.freeze({
      run: new AsyncSeriesHook("compiler"),
      emit: new AsyncSeriesHook("compilation")
    })
  }
}