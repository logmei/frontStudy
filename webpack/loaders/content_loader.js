
var path = require('path')
module.exports = function(source){
  // console.log(this.resourcePath)
  var insert = path.basename(this.resourcePath) === 'index.js'
  var divHtml = `
   ;(
     function(){
      var div = document.createElement('div');
      var text = document.createElement('text');
      text.innerHTML = 'hello [name]';
      div.appendChild(text)
      document.getElementById('${this.query.root}').appendChild(div)
     }
   )(); 
  `
  // console.log('content_loader',source,divHtml)
  return insert?source + divHtml:source
}