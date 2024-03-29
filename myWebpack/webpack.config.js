
const path = require('path');

module.exports = {
  entry:'./src/index.js',
  output:{
    path:path.resolve('dist'),
    filename: 'bundle.js'
  },
  resolveLoader:{
    modules:[
      'node_modules',
      path.resolve(__dirname,'loaders')
    ]
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'myLoader1',
            options:{name:'myloader1'}
          },
          {
            loader:'myLoader2',
            options:{name:'myloader2'}
          }
        ]
      }
    ]
  }
}