
let startX,startY = 0
let endX,endY = 0
let x = 0
let flag = true
function phoneMove(){
  document.getElementById('box').addEventListener('touchstart',(e)=>{
    console.log('touchstart')
    e.preventDefault()
    const touch = e.targetTouches[0]
    startX = touch.pageX - x
  })
  document.getElementById('box').addEventListener('touchmove',(e)=>{
    if(flag){
      console.log('touchmove')
      e.preventDefault()
      const touch = e.targetTouches[0]
      endX = touch.pageX
      x = endX - startX
      document.getElementById('box').style.transform = 'rotate3d(1,1,'+x/2+'deg)';
    }else{
      return false
    }
    
  
  })
  document.getElementById('box').addEventListener('touchend',(e)=>{
    console.log('touchend')
  })
  
  window.addEventListener('deviceorientation',(e)=>{
    const gamma = e.gamma;
    if(Math.abs(gamma)>1){
      flag = false
      document.getElementById('box').style.transform = 'rotateY('+gamma*3+'deg)'
    }else{
      flag = true
    }
  })
}


const mouseMoveSpeed = 0.25
function windowmove(){
  var xx = 0,yy = 0;
  var xArr = [],yArr = [];
  var tArr=[],lArr=[];
  window.onmousedown = function (e) {//鼠标按下事件
      xArr[0] = e.clientX/2;//获取鼠标点击屏幕时的坐标
      yArr[0] = e.clientY/2;

      lArr[0] = e.clientX/2;//获取鼠标点击屏幕时的坐标
      tArr[0] = e.clientY/2;
              var move=false;
              window.onmousemove = function (e) {//鼠标移动事件————当鼠标按下且移动时触发
                      xArr[1] = e.clientX/2;//获取鼠标移动时第一个点的坐标
                      yArr[1] = e.clientY/2;
                      yy += xArr[1] - xArr[0];//获得鼠标移动的距离
                      xx += yArr[1] - yArr[0];
                      move= yy!=0&&xx!=0?true:false;
                  //将旋转角度写入transform中
                  if(move){
                      //  var eleId=e.srcElement.id;
                      var box=document.getElementById('box');
                      var container=document.getElementById('container');
                      var scaleV="";
                      container.style.transform = "rotatex("+((-xx)*mouseMoveSpeed)+"deg) rotatey("+(-yy*mouseMoveSpeed)+"deg)";
                      if(box)box.style.transform = "rotatex("+((-xx)*mouseMoveSpeed)+"deg) rotatey(0deg) rotatez("+(-yy*mouseMoveSpeed)+"deg)"+scaleV;
                      xArr[0] = e.clientX/2;
                      yArr[0] = e.clientY/2;

                      lArr[0] = e.clientX/2;
                      tArr[0] = e.clientY/2;
                  }

              }
          }
  window.onmouseup = function () {//鼠标抬起事件————用于清除鼠标移动事件，
      window.onmousemove = null;
  }
}