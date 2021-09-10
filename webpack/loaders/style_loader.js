// 自定义loader就是个函数，但不能用箭头函数，因为需要使用this

module.exports = function(source){
  console.log(source,this.query)
  return source
}