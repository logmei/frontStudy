const url = 'https://testqcar.apiins.com/h5img/app/ImgView/getImgFile?vkey=C3E76EAF4B816638736F9E42912E6CDE484829928248D8D068236241ACCE669EFE9C484CB85E0F1B8CC6376EBA6FC2D965B7FA12E2C3E747173618AC57B12D73D6A3DA62E41AFF3617661B4BE45A312E6AFA82AE7ECC1BB80C18A771EEB61373A382F4CFF9897A7A62AB155C456DF500B1D46BD8E5055E60'
const params = {
  headers : {
  'content-type':'application/pdf',
},
  responseType:'blob',
  mode:'no-cors'
}

function downloadFile(blob){
  const a = document.createElement('a')
  a.download = 'a.pdf';
  a.href = blob
  document.body.appendChild(a)
  a.click()
}
fetch(url,params).then(res=>{
  downloadFile(res)
})
