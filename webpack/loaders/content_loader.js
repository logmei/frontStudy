
module.exports = function(source){
  
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
  console.log('content_loader',source,divHtml)
  return source + divHtml
}