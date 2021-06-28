const root = {
  value:5,
  children:[
    {
      value:2,
      children:[
        {
          value:9
        },
        {
          value:10,
          children:[
            {
              value:1
            }
          ]
        }
      ]
    },
    {
      value: 4
    }
  ],

}

// 深度优先遍历
function deepTravesal(node){
  let nodes = []
  if(node){
    nodes.push(node.value)
    if(node.children && Array.isArray(node.children)){
      node.children.forEach(v=>{
        nodes.push(...deepTravesal(v))
      })
    }
  }
  return nodes
}

const n = deepTravesal(root)
console.log(JSON.stringify(n))