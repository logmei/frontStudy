const promiseFun = (type,time)=>{
  return new Promise((resovle,reject)=>{
    setTimeout(()=>{
      resovle(type+time)
    },time)
  })
}

const data = {
  applyImgList:[{
    type:'applyImgList',
    url:'applyImgList url'
  }],
  decorateImgList:[{
    type:'decorateImgList',
    url:'decorateImgList url'
  }],
  fileUrl:'fileUrl'
}

const addDecorate = ()=>{

}

const handlerSubmit = async ()=>{
  const submitData = {...data}
 
  // 申请图片
  if(submitData.applyImgList && submitData.applyImgList.length>0)submitData.applyImgList.forEach(async(v)=>{
    console.log('upload----',v)
    await promiseFun(v.type,1000)().then(res=>(v.result = res))
  })
   // 装修图片
   if(submitData.decorateImgList && submitData.decorateImgList.length>0)submitData.decorateImgList.forEach(async(v)=>{
    await promiseFun(v.type,1000)().then(res=>(v.result = res))
  })
   // 附件
   if(submitData.fileUrl) 
    await promiseFun(submitData.fileUrl,1000)().then(res=>(v.result = res))
  
  setTimeout(()=>{
   console.log('result:',JSON.stringify(submitData))
  },1000)

 


}


