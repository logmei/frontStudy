
module.exports = function(source){
  return `
  ;(function(){
    var head = document.createElement('style');
    head.innerHTML = ${source}
    document.getElementsByTagName('head')[0].appendChild(head)
    })();
  `
}