module.exports = function(source){
 
  return source.replace('[name]',this.query.name)
}