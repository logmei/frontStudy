function loadImage(){
  const width = 300
  const triangle = 360/20
  const r = Math.round(width/(2*Math.tan(Math.PI/20)))-3
  console.log('r',r)
  const elements = Array.from(document.getElementsByName('item'))
  elements.forEach((ele,index)=>{
    // ele.style.background = `url('./image/${index+1}.png') no-repeat`
    ele.style.background = `rgba(0,120,${index*18},1)`
    ele.style.transform = 'rotateY(-'+triangle*index+'deg) translateZ(-'+r+'px)'
   
  })
}



loadImage()