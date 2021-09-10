var less = require('less')
module.exports = function(source){
  var callback = this.async();
  less.render(source).then(function(output){
    // console.log('less------------',output.css)
    callback(null,JSON.stringify(output.css),output.map)
  })
  
}