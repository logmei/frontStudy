# 自定义loader
## 解析配置
```
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
```