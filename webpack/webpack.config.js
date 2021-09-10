const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode:'development',
  output:{
    path: path.resolve('dist'),
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
            loader:'replaceName_loader',
            options:{name:'logmei'}
          },
          {
            loader:'content_loader',
            options:{root:'root'}
          },
          // {
          //   loader:'myLoader1',
          //   options:{name:'myLoader1'}
          // },
          // {
          //   loader:'myLoader2',
          //   options:{root:'myLoader2'}
          // }
        ],
       
      },
      {
        test: /\.less$/,
        use:[
          {
            loader:'style_loader'
          },
          {
            loader:'less_loader'
          }
        ]
      }
    ]
  }
}